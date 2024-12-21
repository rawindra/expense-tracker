<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Builder;

class Transaction extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeFilterType(Builder $query, $type)
    {
        $query->where('type', $type);
    }

    public function scopeFilterDateRange(Builder $query, $start_date, $end_date)
    {
        $query->whereBetween('transaction_date', [$start_date, $end_date]);
    }
}
