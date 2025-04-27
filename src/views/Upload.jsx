import {useFile, useMedia} from '../hooks/apiHooks';

import useForm from '../hooks/formHooks';
import {useNavigate} from 'react-router';
import {useState} from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const doUpload = async () => {
    try {
      // implement upload
      const token = window.localStorage.getItem('token');

      const fileResult = await postFile(file, token);
      console.log('fileResult', fileResult);

      const mediaResult = await postMedia(fileResult.data, inputs, token);
      console.log('mediaResult', mediaResult);

      navigate('/');
    } catch (error) {
      console.log('error', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doUpload);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      // TODO: set the file to state
      setFile(evt.target.files[0]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Upload</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium mb-1">
            Title
          </label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="file" className="block text-lg font-medium mb-1">
            File
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mt-4">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://placehold.co/600x400?text=Choose+image'
            }
            alt="preview"
            className="w-48 h-auto border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={!(file && inputs?.title.length > 3)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
};
export default Upload;
