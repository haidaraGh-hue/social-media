<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Story;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StoryController extends Controller
{

    public function store(Request $request){
        $request->validate([
            'file' => 'required|file',
        ]);

        try {
            $path = $request->file('file')->store('uploads', 'public');
            $type = pathinfo($path, PATHINFO_EXTENSION);
    
            Story::create([
                'file_path' => $path,
                'file_type' => $type === "mp4" ? "video" : "image",
                'user_id' => Auth::id(),
            ]);
    
            return response()->json(['message' => 'The Story Has Been Uploaded Successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to upload the story: ' . $e->getMessage()], 500);
        }
    }

    public function getStories() {

        $stories = Story::where('user_id', '!=', Auth::id())->with('user')->get();

        return $stories;
    }

    public function getStoryById($id){
        $story = Story::where('id', $id)->get();
        return $story;
    }
}
