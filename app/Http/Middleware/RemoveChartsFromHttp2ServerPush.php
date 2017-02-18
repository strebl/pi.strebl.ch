<?php

namespace PiFinder\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RemoveChartsFromHttp2ServerPush
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $this->response = $next($request);

        if ($this->shouldUseServerPush($request) && !$request->is('stats')) {
            app('server-push')->resources = collect(app('server-push')->resources)->reject(function ($resource) {
                return str_contains($resource['path'], '/js/charts.');
            })->toArray();
        }

        return $this->response;
    }

    /**
     * @param Request $request
     *
     * @return bool
     */
    protected function shouldUseServerPush(Request $request) : bool
    {
        return !$request->ajax();
    }
}
