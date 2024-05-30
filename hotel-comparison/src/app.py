from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from script import process
import tempfile
import os
import shutil

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global variable to store the path of the processed file
processed_file_path = None

@app.route('/process', methods=['POST'])
def process_data():
    global processed_file_path

    try:
        data = request.form
        iol_url = data['iolUrl']
        ratehawk_url = data['ratehawkUrl']
        file = request.files['file']
        
        # Save the uploaded file to a temporary location
        temp_dir = tempfile.mkdtemp()
        temp_excel_path = os.path.join(temp_dir, file.filename)
        file.save(temp_excel_path)
        
        # Use the existing processed file if it exists, otherwise use the newly uploaded file
        input_file_path = processed_file_path if processed_file_path else temp_excel_path
        
        # Process the file and get the path of the new processed file
        processed_file_path = process(iol_url, ratehawk_url, input_file_path, temp_dir)
        
        # Normalize the path to avoid errors
        processed_file_path = os.path.normpath(processed_file_path)
        
        # Return the processed file as a response with the correct filename
        response = send_file(
            processed_file_path,
            as_attachment=True,
            download_name='Admin.xlsx',
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        
        # Clean up the temporary directory after sending the file
        @response.call_on_close
        def cleanup_temp_dir():
            try:
                shutil.rmtree(temp_dir)
                print(f"Temporary directory {temp_dir} deleted.")
            except Exception as e:
                print(f"Error deleting temporary directory {temp_dir}: {e}")

        return response
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
