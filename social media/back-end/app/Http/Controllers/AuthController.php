<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponses;

    public function getUserById($id){
        $user = User::find($id);
        return $user;
    }
    
    public function login(LoginRequest $request)
    {
        $request->validated($request->all());

        if (!Auth::attempt($request->only(['email', 'password']))) {
            return $this->error('', 'Credentials do not match', 401);
        }
        $user = User::where('email', $request->email)->first();

        return $this->sucess([
            'user' => $user,
            'token' => $user->createToken('Api Token of' . $user->name)->plainTextToken
        ]);
    }
    public function register(StoreUserRequest $request)
    {
        $request->validated($request->all());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'coverPic' => "https://tokystorage.s3.amazonaws.com/images/default-cover.png",
            'profilePic' => "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            'city' => $request->city ,
            'study' => $request->study,
            'university_or_school_name' => $request->university_or_school_name,
            'work' => $request->work,
        ]);

        return $this->sucess([
            'user' => $user,
            'token' => $user->createToken('Api Token of' . $user->name)->plainTextToken
        ]);
    }

    public function updateUser(Request $request){
        $request->validate([
            'profilePic' => 'file',
            'coverPic' => 'file',
        ]);

        $pathCoverPic = $request->file('coverPic')->store('uploads', 'public');
        $pathProfilePic = $request->file('profilePic')->store('uploads', 'public');

        try {
            $user = User::where('id', $request->id)->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'coverPic' => $pathCoverPic,
                'profilePic' => $pathProfilePic,
                'city' => $request->city,
                'study' => $request->study,
                'university_or_school_name' => $request->university_or_school_name,
                'work' => $request->work,
            ]);

            return $this->sucess([
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to upload the story: ' . $e->getMessage()], 500);
        }
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return $this->sucess([
            'message' => 'You Have Been Succesfully Logged Out'
        ]);
    }
    public function refresh(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'user' => $user,
        ]);
    }
}
