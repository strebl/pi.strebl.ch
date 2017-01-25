<?php

namespace Tests;

class ExampleTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();

        $this->prepareForTests();
    }

    private function prepareForTests()
    {
        \Artisan::call('migrate');
    }

    /**
     * @test
     */
    public function it_returns_status_code_200_on_the_homepage()
    {
        $response = $this->call('GET', '/');

        $this->assertEquals(200, $response->getStatusCode());
    }

    /**
     * @test
     */
    public function it_has_the_correct_database_for_testing()
    {
        $this->assertEquals(':memory:', env('SQLITE_DATABASE'));
    }
}
