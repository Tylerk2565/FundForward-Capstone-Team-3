import React from 'react'
import BioCard from '../components/BioCard'
import jerry from '../assets/jerry.jpg'

const About = () => {

    return (
        <>
           <div className="relative w-full h-screen flex items-center justify-center">
                <div className="absolute top-1/2 left-0 w-full h-[80vh] -translate-y-1/2"> 
                    <img src="https://images.unsplash.com/photo-1507810670121-b08efd787765?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Charlotte Skyline" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-black/50 to-transparent"></div>
                        <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-black/50 to-transparent"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div> 
                    </div>
                </div>
                <h1 className="relative text-white font-bold text-5xl">About Us</h1>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold mb-4">Our Team</h1>
                <p className="max-w-lg p-8">
                    Our team is made up of a group of developers who are passionate about creating a platform that connects volunteers with non-profits. We believe that by making it easier for volunteers to find opportunities, we can help non-profits to find the help they need.
                </p>
            </div>


            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <BioCard
                    name="Jerry Castro Luz"
                    role="Apprentice"
                    bio="Jerry is a passionate developer with 10+ years of experience in full-stack development."
                    image={jerry} // Replace with a real image URL
                    />
                    <BioCard
                    name="Sky Patterson"
                    role="Apprentice"
                    bio="Placeholder bio for Sky Patterson."
                    image="https://s7d2.scene7.com/is/image/PetSmart/5081324"
                    />
                    <BioCard
                    name="Tyler Krug"
                    role="Apprentice"
                    bio="Placeholder bio for Tyler Krug."
                    image="https://s7d2.scene7.com/is/image/PetSmart/5081324"
                    />
                     <BioCard
                    name="Kevin Guzman"
                    role="Apprentice"
                    bio="Placeholder bio for Kevin Guzman."
                    image="https://s7d2.scene7.com/is/image/PetSmart/5081324"
                    />
                </div>
            </div>
        </>
    )
}

export default About