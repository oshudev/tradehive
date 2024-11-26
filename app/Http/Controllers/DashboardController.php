<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function freelancer_index() {
        $projects = Project::all(
            ['id', 'title', 'description', 'budget', 'status', 'type']
        );

        return $projects;
    }
}
