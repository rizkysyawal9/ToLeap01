import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '', //default
        component: TabsPage, //localhost/tabs/home
        children: [
            { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
            { path: 'quiz', loadChildren: '../quiz/quiz.module#QuizPageModule' },
            { path: 'chat', loadChildren: '../chat/chat.module#ChatPageModule' },
            { path: 'calendar', loadChildren: '../calendar/calendar.module#CalendarPageModule' },  
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
            { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule' }
        ]
    }

        ];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class TabsRoutingModule { 

}