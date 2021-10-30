<template>
    <div id="landing">
        <main role="main">
            <div class="jumbotron">
                <div class="jumbo-wrapper">
                    <div class="container">
                        <h1 class="display-3">Hello, world!</h1>
                        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                        <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
                    </div>
                </div>
            </div>

            <div class="container" style="padding: 2rem 0.75rem;">
                <!-- Example row of columns -->
                <div class="row">
                    <div class="col-md-4">
                        <h2>Heading</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
                        </p>
                        <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
                    </div>
                    <div class="col-md-4">
                        <h2>Heading</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
                        </p>
                        <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
                    </div>
                    <div class="col-md-4">
                        <h2>Heading</h2>
                        <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit
                            amet risus.
                        </p>
                        <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
    /* Move down content because we have a fixed navbar that is 3.5rem tall 
    body {
        padding-top: 3.5rem;
    }*/
    
    .jumbotron {
        padding: 4rem 2rem;
        color: white;
        background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("images/landing_bg.jpg");
    }
    /* blur 
    .jumbo-wrapper {
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
    }*/
</style>