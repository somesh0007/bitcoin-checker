import { Component,AfterViewInit,ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { CurrencyService } from '../service/currency.service';


@Component({
  selector: 'app-coin-list',
  standalone: true,
  imports: [CommonModule,MatPaginator, MatPaginatorModule,MatSort,MatSortModule,MatInputModule,MatFormFieldModule,MatTableModule],
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss'
})
export class CoinListComponent implements OnInit{
  bannerData:any= [];
  currency:string = "INR"
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private router: Router, private currencyService: CurrencyService){}

  ngOnInit(): void {
    this.getAllData()
    this.getBannerData()
    this.currencyService.getCurrency().subscribe(val =>{
      this.currency = val
      this.getAllData()
      this.getBannerData()
    })
  }
  getBannerData(){
    this.api.getTrendingCurrency(this.currency).subscribe((res:any)=>{
      this.bannerData = res
    })
  }
  getAllData(){
    this.api.getCurrency(this.currency).subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  goToDetails(row:any){
    this.router.navigate(['coin-detail', row.id])
  }
}
