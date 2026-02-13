import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-getconform',
  templateUrl: './getconform.component.html',
  styleUrls: ['./getconform.component.scss']
})
export class GetconformComponent implements OnInit {
  msg !: string
  constructor(
    private _matDilogRef: MatDialogRef<GetconformComponent>,
    @Inject(MAT_DIALOG_DATA) data: string) {
    this.msg = data
  }

  ngOnInit(): void {
  }

  onClose(flag: boolean) {
    this._matDilogRef.close(flag)
  }

}
