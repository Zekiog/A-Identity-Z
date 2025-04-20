import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TranslationManagement = () => {
  const [translations, setTranslations] = useState([
    {
      id: 1,
      title: 'Corporate Website Localization',
      client: 'NorTech Solutions',
      sourceLanguage: 'English',
      targetLanguages: ['Norwegian', 'Swedish', 'Danish'],
      status: 'In Progress',
      dueDate: new Date(2023, 6, 15),
      progress: 65,
    },
    {
      id: 2,
      title: 'Technical Documentation',
      client: 'GreenStream Energy',
      sourceLanguage: 'Norwegian',
      targetLanguages: ['English', 'German'],
      status: 'Completed',
      dueDate: new Date(2023, 5, 20),
      progress: 100,
    },
    {
      id: 3,
      title: 'Marketing Materials',
      client: 'Global Connect',
      sourceLanguage: 'English',
      targetLanguages: ['Norwegian', 'Swedish', 'Danish', 'German', 'Turkish'],
      status: 'Pending Review',
      dueDate: new Date(2023, 7, 5),
      progress: 90,
    },
    {
      id: 4,
      title: 'Product Catalog',
      client: 'Nordic Innovations',
      sourceLanguage: 'Swedish',
      targetLanguages: ['English', 'German', 'Turkish'],
      status: 'Not Started',
      dueDate: new Date(2023, 7, 25),
      progress: 0,
    },
    {
      id: 5,
      title: 'Legal Agreement Translation',
      client: 'TechFlow Systems',
      sourceLanguage: 'English',
      targetLanguages: ['Norwegian', 'German'],
      status: 'In Progress',
      dueDate: new Date(2023, 6, 28),
      progress: 45,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSubmit = (data) => {
    // In a real app, we would send this to an API
    const newTranslation = {
      id: translations.length + 1,
      title: data.title,
      client: data.client,
      sourceLanguage: data.sourceLanguage,
      targetLanguages: data.targetLanguages.split(','),
      status: 'Not Started',
      dueDate: selectedDate,
      progress: 0,
    };
    
    setTranslations([...translations, newTranslation]);
    setIsAddModalOpen(false);
    reset();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Translation Projects</h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Add New Project
          </button>
        </div>
      </div>

      {/* Project List */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Project
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Client
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Languages
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Due Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Progress
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {translations.map((project) => (
                    <tr key={project.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {project.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {project.client}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex flex-col">
                          <span className="font-medium">{project.sourceLanguage} →</span>
                          <span>{project.targetLanguages.join(', ')}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {project.dueDate.toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-primary-600 h-2.5 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs mt-1 block">{project.progress}%</span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-primary-600 hover:text-primary-900 mr-4">
                          Edit
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Add New Translation Project
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Project Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && (
                          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                          Client
                        </label>
                        <input
                          type="text"
                          id="client"
                          className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          {...register('client', { required: 'Client is required' })}
                        />
                        {errors.client && (
                          <p className="mt-1 text-sm text-red-600">{errors.client.message}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label htmlFor="sourceLanguage" className="block text-sm font-medium text-gray-700">
                          Source Language
                        </label>
                        <select
                          id="sourceLanguage"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                          {...register('sourceLanguage', { required: 'Source language is required' })}
                        >
                          <option value="">Select a language</option>
                          <option value="English">English</option>
                          <option value="Norwegian">Norwegian</option>
                          <option value="Swedish">Swedish</option>
                          <option value="Danish">Danish</option>
                          <option value="German">German</option>
                          <option value="Turkish">Turkish</option>
                          <option value="Arabic">Arabic</option>
                        </select>
                        {errors.sourceLanguage && (
                          <p className="mt-1 text-sm text-red-600">{errors.sourceLanguage.message}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label htmlFor="targetLanguages" className="block text-sm font-medium text-gray-700">
                          Target Languages (comma separated)
                        </label>
                        <input
                          type="text"
                          id="targetLanguages"
                          className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          placeholder="English, Norwegian, German"
                          {...register('targetLanguages', { required: 'Target languages are required' })}
                        />
                        {errors.targetLanguages && (
                          <p className="mt-1 text-sm text-red-600">{errors.targetLanguages.message}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                          Due Date
                        </label>
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          dateFormat="MMMM d, yyyy"
                        />
                      </div>

                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm"
                        >
                          Add Project
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsAddModalOpen(false)}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslationManagement;