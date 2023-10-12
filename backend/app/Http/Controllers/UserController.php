<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequestUserUpdate;
use App\Http\Resources\UserEditResource;
use App\Http\Resources\UserListResource;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json(['data' => UserListResource::collection($users)], 200);
    }

    public function show(String $id)
    {
        $user = User::findOrFail($id);
        return response()->json(['data' => new UserEditResource($user)], 200);
    }

    public function update(RequestUserUpdate $request, String $id)
    {
        try {
            $user = User::findOrFail($id);
            $data = $request->validated();
            if ($request->hasFile('photo')) {
                if (!empty($user->photo)) {
                    unlink(public_path('images/user/' . $user->photo));
                }
                $file = $request->file('photo');
                $fileName = time() . '_' . pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . '.webp';
                $image = Image::make($file);
                $image->encode('webp', 75);
                $image->save(public_path('images/user/' . $fileName));
                $data['photo'] = $fileName;
            }
            $user->update($data);
            return response()->json(['message' => 'User updated successfully', 'data' => $user], 200);
        } catch (Exception $e) {
            Log::error('Error updating user: ' . $e->getMessage());
        }
    }
}
