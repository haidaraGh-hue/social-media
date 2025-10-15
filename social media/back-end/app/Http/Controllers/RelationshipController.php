<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Relationship;
use Illuminate\Http\Request;
use App\Models\User;

class RelationshipController extends Controller
{
    public function getUsersIFollow($id){

        $usersIFollowId = Relationship::where('follower_user_id', $id)->get('followed_user_id');
        
        $usersIFollow = [];
        $usersIFollowIdInArray = [];
        foreach ($usersIFollowId as $key => $value) {
            array_push($usersIFollowIdInArray, $value['followed_user_id']);
        }
        $usersIFollow = User::whereIn('id', $usersIFollowIdInArray)->get();
        return $usersIFollow;
    }

    public function getUsersFollowMe($id){
        $usersFollowMeId = Relationship::where('followed_user_id', $id)->get('follower_user_id');

        $usersFollowMe = [];
        $usersFollowMeIdInArray = [];
        foreach ($usersFollowMeId as $key => $value) {
            array_push($usersFollowMeIdInArray, $value['follower_user_id']);
        }
        $usersFollowMe = User::whereIn('id', $usersFollowMeIdInArray)->get();
        return $usersFollowMe;
    }

    public function getFriendshipSuggestions($id){

        $friendshipSuggestionsId = Relationship::where('follower_user_id',  $id)->get('followed_user_id');

        $friendshipSuggestions = [];
        
        $friendsId = [];
        foreach ($friendshipSuggestionsId as $key => $value) {
            array_push($friendsId, $value['followed_user_id']);
        }
        array_push($friendsId, $id);
        $friendshipSuggestions = User::whereNotIn('id', $friendsId)->get();
        return $friendshipSuggestions;
    }

    public function addFollow($followerId, $followedId){

        Relationship::create([
            'follower_user_id' => $followerId,
            'followed_user_id' => $followedId,
        ]);

        return response()->json(['message' => 'Successfully Following']);
    }
}
