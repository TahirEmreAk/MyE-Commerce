import { ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import React from 'react';
import TopCategories from '../components/TopCategories';

export default function HomePage() {
    return (
        <div className="flex flex-col">
            <TopCategories />
            {/* 1. Header Section - mobile-shop-header-1 */}
            <section className="bg-blue-50 p-6">
                <div className="container mx-auto">
                    <h4 className="text-blue-400 font-bold mb-2">SUMMER 2020</h4>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">NEW COLLECTION</h2>
                    <p className="text-gray-600 mb-6">We know how large objects will act, but things on a small scale.</p>
                    <button className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                        SHOP NOW <ArrowRight className="ml-2" size={16} />
                    </button>
                </div>
            </section>

            {/* 2. Clients Section - mobile-clients-1 */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        {['Nooli', 'UA', 'stripe', 'aws', '5'].map((client, index) => (
                            <div key={index} className="text-gray-500 font-medium">
                                {client}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Top Products - mobile-shop-cards-23 */}
            <section className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-6">Top Product Of the Week</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="h-48 bg-gray-200 mb-4 rounded"></div>
                                <button className="w-full py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50">
                                    EXPLORE ITEMS
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Bestseller Products - mobile-product-cards-21 */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-2">BESTSELLER PRODUCTS</h2>
                    <p className="text-gray-600 text-center mb-8">Production trying to resolve the</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="border rounded-lg p-4">
                                <div className="bg-gray-100 h-40 mb-4 rounded"></div>
                                <div className="text-sm text-gray-500 mb-1">Couple Design</div>
                                <div className="font-medium mb-2">English Department</div>
                                <div className="text-gray-500 mb-2">$16.48</div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">$6.48</span>
                                    <span className="text-green-500">Sale</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded-md hover:bg-blue-50">
                            LOAD MORE PRODUCTS
                        </button>
                    </div>
                </div>
            </section>

            {/* 5. Content Section - mobile-content-7 */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-2">Featured Products</h2>
                    <h3 className="text-xl text-center mb-4">We love what we do</h3>
                    <p className="text-gray-600 text-center mb-6">
                        Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
                    </p>
                    <p className="text-gray-600 text-center">
                        Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
                    </p>
                </div>
            </section>

            {/* 6. Features Section - mobile-features-12 */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-2">Featured Products</h2>
                    <h3 className="text-xl text-center text-blue-400 mb-4">THE BEST SERVICES</h3>
                    <p className="text-gray-600 text-center mb-8">Problems trying to resolve the conflict between</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Easy Wins",
                                desc: "Get your best looking smile now!"
                            },
                            {
                                title: "Concrete",
                                desc: "Defalcate is most focused in helping you discover your most beautiful smile"
                            },
                            {
                                title: "Hack Growth",
                                desc: "Overcame any hurdle or any other problem."
                            }
                        ].map((feature, index) => (
                            <div key={index} className="p-6 border rounded-lg text-center">
                                <div className="h-12 w-12 bg-blue-100 rounded-full mx-auto mb-4"></div>
                                <h4 className="font-bold mb-2">{feature.title}</h4>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Blog Section - mobile-blog-2 */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h4 className="text-center text-blue-400 font-bold mb-2">Practice Advice</h4>
                    <h2 className="text-2xl font-bold text-center mb-4">Featured Posts</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2].map((post) => (
                            <div key={post} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex justify-between mb-4">
                                    <span className="text-blue-400 font-bold">NEW</span>
                                    <span className="text-gray-500">Google Trending New</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Loudest a la Madison #1 (Lintegra)</h3>
                                <p className="text-gray-600 mb-4">
                                    We focus on ergonomics and meeting you where you work. It's only a keystroke away.
                                </p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-500">22 April 2021</span>
                                    <span className="text-gray-500">10 comments</span>
                                </div>
                                <button className="flex items-center text-blue-500 font-medium">
                                    Learn More <ChevronRight className="ml-1" size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}