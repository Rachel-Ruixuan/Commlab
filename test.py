import os

directory = 'tutorial/images/video'

for filename in os.listdir(directory):
    if filename.startswith('2711092-hd_') and filename.endswith('.jpg'):
        print(f'Processing: {filename}')
        new_name = filename.split('_')[-1]  # Get the last part after the last underscore
        new_name = new_name.replace('2711092-hd_1280_720_24fps_', '')  # Remove the prefix
        new_name = new_name.replace('.jpg', '') + '.jpg'  # Ensure it ends with .jpg
        
        old_file = os.path.join(directory, filename)
        new_file = os.path.join(directory, new_name)
        
        os.rename(old_file, new_file)
        print(f'Renamed: {old_file} to {new_file}')