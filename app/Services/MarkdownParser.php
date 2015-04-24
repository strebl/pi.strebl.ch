<?php

namespace PiFinder\Services;

use ParsedownExtra;

class MarkdownParser
{
    /**
     * Markdown parser instance.
     *
     * @var ParsedownExtra
     */
    private $markdown;

    /**
     * MarkdownParser constructor.
     *
     * @param ParsedownExtra $markdown
     */
    public function __construct(ParsedownExtra $markdown)
    {
        $this->markdown = $markdown;
    }

    /**
     * Parse a markdown document.
     *
     * @param $path
     *
     * @return mixed|string
     */
    public function parse($path)
    {
        return $this->markdown->text($path);
    }
}
