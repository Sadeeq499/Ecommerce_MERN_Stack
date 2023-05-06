import React from 'react'
import Layout from '../components/layout/Layout'
import picture from '../images/aboutpic.jpg'

function About() {
  return (
    <Layout title={"About"}>
      <section>
      <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <div className="flex flex-wrap justify-center items-start">
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-6">
            <div className="p-6 bg-white shadow rounded-lg">
              <h2 className="text-lg font-bold mb-2">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                ac odio eget felis fringilla commodo eu vel sapien. Mauris
                lacinia nisi vel lorem hendrerit, in finibus tellus sodales.
                Nulla facilisi. Proin quis ultricies nunc, a sollicitudin
                magna.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-6">
            <div className="p-6 bg-white shadow rounded-lg">
              <h2 className="text-lg font-bold mb-2">Our Team</h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                ac odio eget felis fringilla commodo eu vel sapien. Mauris
                lacinia nisi vel lorem hendrerit, in finibus tellus sodales.
                Nulla facilisi. Proin quis ultricies nunc, a sollicitudin
                magna.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-6">
            <div className="p-6 bg-white shadow rounded-lg">
              <h2 className="text-lg font-bold mb-2">Our History</h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                ac odio eget felis fringilla commodo eu vel sapien. Mauris
                lacinia nisi vel lorem hendrerit, in finibus tellus sodales.
                Nulla facilisi. Proin quis ultricies nunc, a sollicitudin
                magna.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* add image  */}
      <img src={picture} alt='about' className='w-full h-full' />
    </div>
      </section>
    </Layout>
  )
}

export default About