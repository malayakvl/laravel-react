<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\TaskUpdateRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Task;
use App\Models\TaskUsers;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Redirect;

class TaskController extends Controller
{
    //
    public function view(Request $request): Response
    {
        $sharedTasks = DB::table('tasks')
            ->select('tasks.*', 'task_users.read_only')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->where('task_users.user_id', $request->user()->id)
            ->get();

        return Inertia::render('Task/List', [
            'taskData' => Task::where('user_id', $request->user()->id)->get(),
            'sharedTasks' => $sharedTasks
        ]);
    }

    public function edit(Request $request): Response
    {
        $taskId = $request->route('id');
        $users = User::where('id', '!=' , $request->user()->id)->get();
        $taskData = Task::where([
            'user_id' => $request->user()->id,
            'id' => $taskId
        ])->get();

        return Inertia::render('Task/Edit', [
            'taskData' => $taskData,
            'usersData' => $users
        ]);
    }

    public function viewTask(Request $request): Response
    {
        $taskId = $request->route('id');
        $taskData = Task::where([
            'id' => $taskId
        ])->get();

        return Inertia::render('Task/View', [
            'taskData' => $taskData,
        ]);
    }

    public function add(Request $request): Response
    {
        $users = User::where('id', '!=' , $request->user()->id)->get();

        return Inertia::render('Task/Add', [
            'usersData' => $users
        ]);
    }

    public function create(TaskUpdateRequest $request): Response
    {
        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->completed = $request->completed;
        $task->asign_to = $request->asign_to ? $request->asign_to :  null;
        $task->user_id = $request->user()->id;
        $task->save();

        return Inertia::render('Task/List', [
            'taskData' => Task::where('user_id', $request->user()->id)->get(),
        ]);
    }

    public function update(TaskUpdateRequest $request): Response
    {
        $task = Task::find($request->id);
        $task->title = $request->title;
        $task->description = $request->description;
        $task->completed = $request->completed;
        $task->asign_to = $request->asign_to ? $request->asign_to :  null;
        $task->save();

        return Inertia::render('Task/List', [
            'taskData' => Task::where('user_id', $request->user()->id)->get(),
        ]);
    }

    public function share(Request $request): Response
    {
        $taskId = $request->route('id');
        $taskData = Task::where([
            'user_id' => $request->user()->id,
            'id' => $taskId
        ])->get();

        $users = User::where('id', '!=' , $request->user()->id)->get();
        return Inertia::render('Task/Share', [
            'usersData' => $users,
            'taskData' => $taskData
        ]);
    }

    public function shareSave(Request $request): \Illuminate\Http\RedirectResponse
    {
        $taskId = $request->taskId;
        $ids = $request->ids ? json_decode($request->ids) : [];
        if (count($ids)) {
            foreach ($ids as $id) {
                $shTask = new TaskUsers();
                $shTask->user_id = $id->id;
                $shTask->task_id = $taskId;
                $shTask->read_only = $id->readOnly;
                $shTask->save();
            }
        }

        return Redirect::route('task.list');
    }
}


