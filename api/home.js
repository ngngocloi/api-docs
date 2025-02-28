const fs = require('fs');
const path = require('path');

module.exports = {
    info: {
        path: '/home',
        title: 'Home',
        desc: 'API Home Page',
        example_url: []
    },
    methods: {
        get: (req, res) => {
            const apiDir = path.join(__dirname);
            const apis = fs.readdirSync(apiDir).filter(file => file !== 'home.js');
            const apiInfo = apis.map(file => {
                const api = require(path.join(apiDir, file));
                return api.info;
            });

            const generateApiList = (apis) => {
                return apis.map(api => `
                    <div class="not-prose my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md">
                        <div class="flex min-h-[calc(theme(spacing.12)-8px)] flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4">
                            <div class="mr-auto pt-3 text-xs font-semibold text-white">${api.title}</div>
                            <a href="${api.example_url.length > 0 ? api.example_url[0].query : '#'}" class="mt-3 md:ml-3 md:mt-0 py-2 px-4 text-center whitespace-nowrap border border-white text-xs rounded-md shadow font-medium text-white hover:text-gray-300 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 focus:ring-offset-primary-900">
                                Test API
                            </a>
                        </div>
                        <div class="relative">
                            <pre data-controller="syntax-highlighting"><code class="language-http">${api.desc}</code></pre>
                        </div>
                        <div class="relative">
                            ${api.example_url.map(ex => `
                                <pre data-controller="syntax-highlighting"><code class="language-js">${ex.method}: ${ex.query} - ${ex.desc}</code></pre>
                            `).join('')}
                        </div>
                    </div>
                `).join('');
            };

            res.set('content-type', 'text/html');
            res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document API</title>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <script src="https://cdn.jsdelivr.net/gh/Nguyenblur/Api@main/application-8046f17e3d405ffc42d473c32c22ae2d5c7d9ed82018b86ad7e5f773ee1293dc.js" data-turbo-track="reload" defer="defer"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Nguyenblur/Api@main/application-8046f17e3d405ffc42d473c32c22ae2d5c7d9ed82018b86ad7e5f773ee1293dc.css" media="all" data-turbo-track="reload" />
    <style>
        .flex-column {
            display: flex;
            flex-direction: column;
        }
        .align-items-center {
            align-items: center;
        }
        .text-center {
            text-align: center;
        }
    </style>
</head>
<body class="h-full font-sans antialiased font-normal leading-normal bg-white">
    <div class="main flex flex-col">
        <main>
            <div class="pt-4 bg-gray-900 sm:pt-10 lg:pt-2 lg:overflow-hidden">
                <div class="mx-auto max-w-7xl lg:px-8">
                    <div class="lg:grid lg:grid-cols-2 lg:gap-8">
                        <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:text-left lg:flex lg:items-center lg:flex-column lg:align-items-center">
                            <div class="lg:py-24 lg:align-items-center">
                                <a class="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200" href="/announcements">
                                    <span class="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-gradient-to-r from-violet-500 to-primary-600 rounded-full">Wionp Api</span>
                                </a>
                                <div class="mt-4 sm:mt-5 lg:mt-6 lg:flex lg:flex-column lg:align-items-center">
                                    <h1 class="tracking-tight font-extrabold text-white block pb-3 text-4xl sm:text-6xl xl:text-6xl text-center">Many attractive free APIs</h1>
                                    <span class="tracking-tighter font-extrabold pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-primary-400 sm:pb-5 text-2xl sm:text-2xl text-center">Quick user response</span>
                                </div>
                                <ul class="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl text-center lg:align-items-center">
                                    <li class="mt-3 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-6 w-6 flex-shrink-0 h-6 w-6 text-teal-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                        </svg>
                                        <span class="ml-2">All are free</span>
                                    </li>
                                    <li class="mt-3 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-6 w-6 flex-shrink-0 h-6 w-6 text-teal-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                        </svg>
                                        <span class="ml-2">Always open 24/7</span>
                                    </li>
                                    <li class="mt-3 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-6 w-6 flex-shrink-0 h-6 w-6 text-teal-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                        </svg>
                                        <span class="ml-2">Supports quick handling when errors appear</span>
                                    </li>
                                </ul>
                                <div class="mt-10 sm:mt-12 flex flex-wrap flex-col md:block lg:align-items-center">
                                    <a class="py-3 px-5 flex-1 text-center whitespace-nowrap border border-gray-900 text-base rounded-md shadow text-white font-medium bg-gradient-to-r from-violet-500 to-primary-600 hover:from-violet-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 focus:ring-offset-primary-900">Get Requests Free</a>
                                    <a class="mt-3 md:ml-3 md:mt-0 py-3 px-5 flex-1 text-center whitespace-nowrap border border-white text-base rounded-md shadow font-medium text-white hover:text-gray-300 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 focus:ring-offset-primary-900" href="https://www.facebook.com/duongkum999k">Message With Admin</a>
                                </div>
                            </div>
                        </div>
                        <div class="mx-auto max-w-md px-4 py-10 sm:max-w-2xl sm:px-6 lg:p-0 lg:mt-24 lg:mx-0">
                            <div class="relative lg:ml-8">
                                
                                <div aria-hidden="true" class="hidden lg:block absolute -top-40 -left-20">
                                    <div class="transform max-w-xs">
                                        <div class="w-44 h-64 bg-gradient-to-b from-primary-400 to-violet-400 opacity-30"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 class="sr-only">All Api Requests</h1>
                        <div class="mt-8">
                            ${generateApiList(apiInfo)}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>
</html>`);
        }
    }
};
