<div class="container">
    <nav class="navbar navbar-inverse navbar-lg" role="navigation">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-7">
                <span class="sr-only">Toggle navigation</span>
            </button>
            <a class="navbar-brand" href="/computer">WAKE ON LAN</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="navbar-collapse-7">
            <ul class="nav navbar-nav">
                <li {!! Request::is('/') ? 'class="active"' : '' !!}>
                <a href="/">Overview<span class="navbar-unread"></span></a>
                </li>
            </ul>
            <form class="navbar-form navbar-left" action="#" role="search">
                <div class="form-group">
                    <div class="input-group">
                        <input class="form-control" id="navbarInput-01" type="search" placeholder="Search">
                <span class="input-group-btn">
                  <button type="submit" class="btn"><span class="fui-search"></span></button>
                </span>
                    </div>
                </div>
            </form>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Manuel Strebel <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                    </ul>
                </li>
                <li><a href="#"><span class="visible-sm visible-xs">Settings<span class="fui-gear"></span></span><span class="visible-md visible-lg"><span class="fui-gear"></span></span></a></li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </nav>
</div>