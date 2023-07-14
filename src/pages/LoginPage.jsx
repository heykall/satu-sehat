import { Link } from "react-router-dom"

const LoginPage = () => {
    return (
        <>
            <section className=" overflow-hidden">
    <div className="flex min- overflow-hidden">
        <div className="relative flex-1 hidden w-0 overflow-hidden lg:block">
            <img className="absolute inset-0 object-cover w-full h-full bg-black" src="/assets/images/placeholders/rectangleWide.png" alt=""/>
        </div>
        <div className="flex flex-col justify-center flex-1 px-4 py-12 overflow-hidden sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="w-full max-w-xl mx-auto lg:w-96">
                <div>
                    <h2 className="flex justify-left mt-6 text-3xl font-extrabold text-neutral-600">Log in.</h2>
                </div>

                <div className="mt-8">
                    <div className="mt-6">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label for="email" className="flex justify-left block text-sm font-medium text-neutral-600"> Email address </label>
                                <div className="mt-1">
                                    <input id="email" name="email" type="email" autocomplete="email" required="" placeholder="Your Email" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label for="password" className="flex justify-left block text-sm font-medium text-neutral-600"> Password </label>
                                <div className="mt-1">
                                    <input id="password" name="password" type="password" autocomplete="current-password" required="" placeholder="Your Password" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">

                                <div className="text-sm">
                                    <Link to="/register"  className="font-medium text-teal-500 hover:text-teal-400"> Register here </Link>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-teal-500 rounded-xl hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
        </>
    )
}

export default LoginPage