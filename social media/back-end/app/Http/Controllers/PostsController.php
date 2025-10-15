<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Posts;
use App\Models\Relationship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    public function setPost(Request $request){
        $request->validate([
            'content' => 'required|string',
        ]);

        Posts::create([
            'content' => $request->content,
            'img' => $request->img,
            'user_id' => Auth::id(),
        ]);

        return response()->json(['message' => 'The Post Has Been Uploaded Successfully']);
    }

    public function getProfilePosts(){

        $posts = Posts::where('user_id', Auth::id())->orderByDesc('created_at')->get();

        return $posts;
    }

    public function getHomePosts(){
        $usersIFollowId = Relationship::where('follower_user_id', Auth::id())->get('followed_user_id');
        
        $usersIFollowIdInArray = [];
        foreach ($usersIFollowId as $key => $value) {
            array_push($usersIFollowIdInArray, $value['followed_user_id']);
        }

        $posts = Posts::orderByDesc('created_at')->with('user')->whereIn('user_id', $usersIFollowIdInArray)->get();
        return $posts;
    }
}
