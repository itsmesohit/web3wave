import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddPublishPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    region: 'USA',
    pressReleaseLink: '',
    category: 'Content Distribution',
    gambling: false,
    web3_0: false,
    adult: false,
    gaming: false,
    publisherWebsiteName: '',
    publisherWebsiteLink: '',
    publisherCompanyLogoLink: '',
    emailToContact: '',
    telegramLink: '',
    features: '',
    languages: 'English'
  });

  const [imageToDisplay, setImageToDisplay] = useState(null);
  const [caseStudyDocLink, setCaseStudyDocLink] = useState(null);
  const [errors, setErrors] = useState({});
  const [popupMessage, setPopupMessage] = useState('');
  const token = Cookies.get('token');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'imageToDisplay') {
      setImageToDisplay(e.target.files[0]);
    } else {
      setCaseStudyDocLink(e.target.files[0]);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!caseStudyDocLink) newErrors.caseStudyDocLink = 'Case Study Document is required';
    if (!formData.emailToContact) newErrors.emailToContact = 'Email to Contact is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    data.append('imageToDisplay', imageToDisplay);
    data.append('caseStudyDocLink', caseStudyDocLink);

    try {
      const response = await axios.post('api/v1/content', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Content offering added successfully:', response.data);
      setPopupMessage('Content offering added successfully');
      setTimeout(() => {
        setPopupMessage('');
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      console.error('Error adding content offering:', error);
      setPopupMessage('Error adding content offering');
      setTimeout(() => {
        setPopupMessage('');
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Add Your Own Publish</h2>
      {popupMessage && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-green-500 text-white flex items-center justify-center"
          style={{ width: '95%', height: '95%', margin: 'auto' }}
        >
          {popupMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div>
          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          ></textarea>
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>
        <div>
          <label className="block mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
        </div>
        <div>
          <label className="block mb-2">Region:</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="USA">USA</option>
            <option value="DUBAI">DUBAI</option>
            <option value="INDIA">INDIA</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Press Release Link:</label>
          <input
            type="url"
            name="pressReleaseLink"
            value={formData.pressReleaseLink}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="Content Distribution">Content Distribution</option>
            <option value="Ads">Ads</option>
            <option value="Youtube Influencer">Youtube Influencer</option>
            <option value="Telegram Influencer">Telegram Influencer</option>
            <option value="Instagram Influencer">Instagram Influencer</option>
            <option value="Twitter Influencer">Twitter Influencer</option>
            <option value="ICO Listing">ICO Listing</option>
            <option value="Exchange Listing">Exchange Listing</option>
          </select>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="gambling"
            checked={formData.gambling}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="block">Gambling</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="web3_0"
            checked={formData.web3_0}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="block">Web 3.0</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="adult"
            checked={formData.adult}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="block">Adult</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="gaming"
            checked={formData.gaming}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="block">Gaming</label>
        </div>
        <div>
          <label className="block mb-2">Publisher Website Name:</label>
          <input
            type="text"
            name="publisherWebsiteName"
            value={formData.publisherWebsiteName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Publisher Website Link:</label>
          <input
            type="url"
            name="publisherWebsiteLink"
            value={formData.publisherWebsiteLink}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Publisher Company Logo Link:</label>
          <input
            type="url"
            name="publisherCompanyLogoLink"
            value={formData.publisherCompanyLogoLink}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Email to Contact:</label>
          <input
            type="email"
            name="emailToContact"
            value={formData.emailToContact}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.emailToContact && <p className="text-red-500">{errors.emailToContact}</p>}
        </div>
        <div>
          <label className="block mb-2">Telegram Link:</label>
          <input
            type="url"
            name="telegramLink"
            value={formData.telegramLink}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Features:</label>
          <textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2">Languages:</label>
          <select
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Arabic">Arabic</option>
            <option value="Urdu">Urdu</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Image to Display:</label>
          <input
            required
            type="file"
            name="imageToDisplay"
            onChange={handleFileChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Case Study Document:</label>
          <input
            type="file"
            name="caseStudyDocLink"
            onChange={handleFileChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          {errors.caseStudyDocLink && <p className="text-red-500">{errors.caseStudyDocLink}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddPublishPage;
