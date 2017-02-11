<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTest;

class TestCase extends BaseTest
{
    use CreatesApplication;

    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';
}
