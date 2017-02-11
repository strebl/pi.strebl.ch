<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class HomePageTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function test_if_the_homepage_loads()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->waitFor('.tile')
                    ->assertSee('Nope!')
                    ->assertSee('No Pi poked me recently');
        });
    }

    public function test_homepage_with_pokes()
    {
        factory(\PiFinder\Device::class)->create([
            'name'       => "Manuel's Pi",
            'ip'         => '192.168.1.123',
            'created_at' => \Carbon\Carbon::parse('-3 days'),
            'updated_at' => \Carbon\Carbon::parse('-4 mins'),
        ]);

        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->waitFor('#device-table')
                    ->assertSee('Manuel\'s Pi')
                    ->assertSee('192.168.1.123')
                    ->assertSee('3 days ago')
                    ->assertSee('4 minutes ago');
        });
    }

    public function test_live_updates()
    {
        $this->browse(function (Browser $browser1, Browser $browser2) {
            $browser1->visit('/')
                     ->waitFor('.tile')
                     ->assertDontSee('Manuel\'s Pi');
            $browser2->visit('/')
                     ->waitFor('.tile')
                     ->assertDontSee('Manuel\'s Pi');

            $this->pokePiFinder([
                'name' => 'Manuel\'s Pi',
                'ip'   => '192.168.1.123',
                'mac'  => '23:23:23:23:23:23',
            ]);

            $browser1->waitFor('#device-table')
                     ->assertSee('Manuel\'s Pi')
                     ->assertSee('192.168.1.123')
                     ->assertSee('seconds ago');
            $browser2->waitFor('#device-table')
                     ->assertSee('Manuel\'s Pi')
                     ->assertSee('192.168.1.123')
                     ->assertSee('seconds ago');
        });
    }

    private function pokePiFinder($data)
    {
        $response = $this->post('/api/v1/devices/poke', $data);
        $response->assertStatus(200);
    }
}
