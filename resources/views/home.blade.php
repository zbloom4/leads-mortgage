<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        <link rel="stylesheet" href="{{secure_url('/css/lead-form/css/main.css')}}">

        <style>
            .background-image {
                -webkit-filter: brightness(0.7);
                filter: brightness(0.7);
            }
        </style>
    </head>
    <body>
        <div id="app"></div>
        <script>
            var secureURL = "{{secure_url('')}}";
        </script>
        <script type="text/javascript" src="{{secure_asset('js/dist/app.bundle.js')}}"></script>
    </body>
</html>
