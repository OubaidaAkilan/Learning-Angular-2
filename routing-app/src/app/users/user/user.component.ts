import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: { id: number; name: string } = { id: 0, name: '' };

  constructor(private router: Router, private route: ActivatedRoute) {}

  loadServer() {
    //...somthing
    this.router.navigate(['/servers']);
  }

  ngOnInit() {
      // this.user = {
      //   id: this.route.snapshot.params['id'],
      //   name: this.route.snapshot.params['name'],
      // };

    // This code will not be excuted when ngOnInit runs through.
    // The subscribtion will be set up but only if the param change.
    this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
  }
}
