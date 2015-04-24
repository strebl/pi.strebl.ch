<?php

namespace App\Transformers;

abstract class Transformer
{
    /**
     * Transform a collection of items.
     *
     * @param array $items
     *
     * @return array
     */
    public function transformCollection(array $items)
    {
        return array_map([$this, 'transform'], $items);
    }

    abstract public function transform($item);
}
