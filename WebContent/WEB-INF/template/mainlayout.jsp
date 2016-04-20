<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Monitoring Ijin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" href="${pageContext.request.contextPath}/rs/static/bootstrap.min.css" media="screen" />
        <link rel="stylesheet" href="${pageContext.request.contextPath}/rs/static/bootstrap-theme.min.css" media="screen" /> 
        <link rel="stylesheet" href="${pageContext.request.contextPath}/rs/static/swift.css" media="screen" />  
        <link rel="stylesheet" href="${pageContext.request.contextPath}/rs/static/custom-swift.css" media="screen" />  
        <script type="text/javascript" src="${pageContext.request.contextPath}/rs/static/jquery-2.1.1.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/rs/static/bootstrap.min.js"></script>   
        <script type="text/javascript" src="${pageContext.request.contextPath}/rs/static/swift.js"></script>  

       
    </head>
    <body>
         <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="${pageContext.request.contextPath}/rs/beranda/product">Product</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

     

        <p>&nbsp;</p>
        <div class="container" > 
            <div class="page-header" id="banner">
                <div class="row">
                   Training
                </div> 
            </div> 
            <div class="bs-docs-section clearfix   ">

                <div class="row">
                     <sitemesh:write property='body'/>
                </div>
            </div> 
            <footer>
                <div class="row">
                    <div class="col-lg-12"> 
                        <p>SIM</p>

                    </div>
                </div>

            </footer>


        </div>




    </body>
</html>
