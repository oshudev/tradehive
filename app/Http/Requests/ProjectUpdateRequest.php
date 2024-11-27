<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'required|uuid',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'budget' => 'required|numeric|min:0',
            'status' => 'required|in:open,in_progress,completed,cancelled',
            'type' => 'required|in:fixed,hourly',
        ];
    }
}
