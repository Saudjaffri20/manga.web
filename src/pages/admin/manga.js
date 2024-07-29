import axios from 'axios';
import React, { useState } from 'react'

const Manga = () => {
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState(null);
  const [fileCount, setFileCount] = useState(null);

  const handleFileChange = (event) => {
    // e.target.files[0]
    const { name, files } = event.target;
    setFileData({ ...fileData, [name]: files[0] });

  };

  const handlePdfChange = (event) => {
    // e.target.files[0]
    const { name, files } = event.target;
    setFileData({ ...fileData, [name]: files[0] });

    var reader = new FileReader();
    reader.readAsBinaryString(files[0]);
    reader.onloadend = function () {
      var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
      setFileCount(count);
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!fileData) return;

      const formPostData = new FormData();
      formPostData.append('file', fileData.article);
      formPostData.append('thumbnail', fileData.thumbnail);
      const res = await axios.post('/api/upload', formPostData);

      if (!res.data.error) {
        const obj = {
          'title': formData.title,
          'price': parseInt(formData.price),
          'description': formData.description,
          'author': formData.author_name,
          'file': res.data.data[0],
          'fileCount': fileCount,
          'thumbnail': res.data.data[1],
        }
        const response = await axios.post('/api/article', obj)

      }

    } catch (error) {
      console.log(error)
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div style={{ maxWidth: '600px' }} className='w-full mx-auto'>
      <form autoComplete="off" onSubmit={handleSubmit} className='w-full'>
        <h2 className="text-2xl font-bold dark:text-white mb-5">Upload</h2>
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" id="title" name="title" value={formData.title || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " />
            <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" id="author_name" name="author_name" value={formData.author_name || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " />
            <label htmlFor="author_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author Name</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type='number' autoComplete="off" id="price" name="price" value={formData.price || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" placeholder=" " />
            <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <textarea autoComplete="off" id="description" name="description" value={formData.description || ""} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#cc2e33] peer" rows={1} placeholder=" "></textarea>
          <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#cc2e33] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white" htmlFor="file_input">Thumbnail</label>
          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" name="thumbnail" onChange={handleFileChange} />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or WEBP (MAX. 800x400px).</p>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white" htmlFor="file_input">Upload file</label>
          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" name="article" onChange={handlePdfChange} />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-300">New</label>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload</button>
      </form>
    </div>
  )
}

export default Manga