import React, {
    useEffect,
    useState
} from 'react';
import CardItem from '../components/CardItem'; // Memanggil Component Card Item
import SimpleChart from '../components/SimpleChart'; // Memanggil Component Simple Chart
import Navbar from '../components/Navbar'; // Memanggil Component Navbar
import Loading from '../components/Loading';  // Memanggil Component Loading
import moment from 'moment/min/moment-with-locales';  // Memanggil Library moment-with-locales yang berfungsi untuk format tanggal dengan bahasa indonesia
import Swal from 'sweetalert2'  // Memanggil Library Sweet Alert2 Untuk popup alert
import withReactContent from 'sweetalert2-react-content' // Memanggil Library sweetalert2-react-content Untuk menggunakan sweet alert 2 di react js



import {
    API_COVID19_GLOBAL,
    API_COVID19_INDO
} from '../constants'; // Memanggil Konnstanta API_COVID19_GLOBAL, dan API_COVID19_INDO yang berisi url endpoint data covid
import {
    BsFillEmojiDizzyFill,
    BsFilePlusFill,
    BsEmojiLaughingFill,
    BsFillHeartFill
} from "react-icons/bs"; // Memanggil Icon-icon bootstrap dari library react icon
export default function Main() {
    const initialDataChart = {
        label: [],
        data: []
    } // membuat const initialDataChart yang berfungsi sebagai nilai default dari state data chart
    const [sourceApi, setSourceApi] = useState("GBL")  // membuat state status asal data, dengan nilai awal GBL atau global
    const [dataSummary, setDataSummary] = useState([]) // membuat state data summary covid 19 nilai awal array kosong
    const [loadingSummary, setLoadingSummary] = useState(false) // membuat state status loading data summary dengan nilai awal false
    const [dataChartDailyConfirmed, setDataChartDailyConfirmed] = useState(initialDataChart)  // membuat state data chart Kasus Covid 19 terkonfirmasi dengan nilai awal konstanta initialDataChart 
    const [dataChartDailyDeath, setDataChartDailyDeath] = useState(initialDataChart)  // membuat state data chart Kasus Covid 19 terkonfirmasi dengan nilai awal konstanta initialDataChart 
    const [dataChartDailyRecovered, setDataChartDailyRecovered] = useState(initialDataChart)   // membuat state data chart Kasus Covid 19 sembuh dengan nilai awal konstanta initialDataChart 
    const [loadingChart, setLoadingChart] = useState(false) // membuat state status loading Chart dengan nilai awal false
    const [dataListRegion, setDataListRegion] = useState([])  // membuat state data kasus covid 19 per region, untuk data global per negara dan untuk data indonesia per provinsi
    const [loadingRegion, setLoadingRegion] = useState(false) // membuat state status loading data kasus per region dengan nilai awal false
    const [lastUpdateDate, setLastUpdateDate] = useState(new Date()) // Membuat stateata tanggal terakhir data covid pada api di update dengan nilai efault adalah tanggal saat ini
    const [keyword, setKeyword] = useState("") // membuat state untuk menampung data keyword pencarian data kasus per region 
    
    useEffect(() => {
        if (sourceApi === "INDO") { // Ketika state sourceApi sama dengan INDO
            getDataSummaryIndo() // Memanggil function getDataSummaryIndo
            getDataDailyIndo() // Memanggil function getDataDailyIndo
            getDataListRegionIndo( )// Memanggil function getDataListRegionIndo
        } else {  // Ketika state sourceApi tidak sama dengan INDO
            getDataSummaryGlobal()// Memanggil function getDataSummaryGlobal
            getDataDailyGlobal()// Memanggil function getDataDailyGlobal
            getDataListRegionGlobal()// Memanggil function getDataListRegionGlobal
        }
    }, [sourceApi]) // Memanggil useEffect, yang akan di jalankan setiap kali ada perubahan data pada state sourceApi
    
    const getDataSummaryIndo = () => { // Merupakan function untuk mengambil rekap data covid indonesia
        setLoadingSummary(true) // merubah nilai dari state loaingSummary menjadi true 
        fetch(API_COVID19_INDO + "api/indonesia") // memanggil http klien "fecth" untuk memanggil data dari url  https://apicovid19indonesia-v2.vercel.app/api/indonesia
            .then(response => response.json()) // Mengubah hasil fecth menjadi JSON
            .then(data => {
                var summary = [{
                        title: [ < BsFilePlusFill className = "me-2" / > , "Terkonfirmasi"],
                        data: data.positif
                    }, 
                    {
                        title: [ < BsEmojiLaughingFill className = "me-2" / > , "Sembuh"],
                        data: data.sembuh
                    },
                    {
                        title: [ < BsFillHeartFill className = "me-2" / > , "Dalam Perawatan"],
                        data: data.dirawat
                    },
                    {
                        title: [ < BsFillEmojiDizzyFill className = "me-2" / > , "Meninggal"],
                        data: data.meninggal
                    }
                ] // Menyesuikan hasil data fecth dengan membagi nya ke beberapa jenis kasus seperti terkonfirmasi dsb dan menambah icon pada judul rekap data
                setLastUpdateDate(data.lastUpdate) // merubah nilai dari state lastUpateDate menjadi sama dengan isi lastUpdate pada hasil fetch
                setDataSummary(summary)// merubah nilai dari state dataSummary menjadi sama dengan hasil fetch yang telah di sesuaikan
                setLoadingSummary(false) // merubah nilai dari state loaingSummary menjadi false
            })
            .catch(error => {
                setLoadingSummary(false) // merubah nilai dari state loaingSummary menjadi false
            })
    }
    
    const getDataSummaryGlobal = () => { // Merupakan function untuk mengambil rekap data covid global
        setLoadingSummary(true) // merubah nilai dari state loaingSummary menjadi true 
        fetch(API_COVID19_GLOBAL + "api") // memanggil http klien "fecth" untuk memanggil data dari url  https://covid19.mathdro.id/api
            .then(response => response.json()) // Mengubah hasil fecth menjadi JSON
            .then(data => {
                var summary = [{
                        title: [ < BsFilePlusFill className = "me-2" / > , "Terkonfirmasi"],
                        data: data.confirmed.value
                    },
                    {
                        title: [ < BsFillHeartFill className = "me-2" / > , "Dalam Perawatan"],
                        data: data.recovered.value
                    },
                    {
                        title: [ < BsFillEmojiDizzyFill className = "me-2" / > , "Meninggal"],
                        data: data.deaths.value
                    }
                ] // Menyesuikan hasil data fecth dengan membagi nya ke beberapa jenis kasus seperti terkonfirmasi dsb dan menambah icon pada judul rekap data
                setLastUpdateDate(data.lastUpdate) // merubah nilai dari state lastUpateDate menjadi sama dengan isi lastUpdate pada hasil fetch
                setDataSummary(summary)// merubah nilai dari state dataSummary menjadi sama dengan hasil fetch yang telah di sesuaikan
                setLoadingSummary(false) // merubah nilai dari state loaingSummary menjadi false
            })
            .catch(error => {
                setLoadingSummary(false) // merubah nilai dari state loaingSummary menjadi false
            })
    }
    
    const getDataDailyGlobal = () => {// Merupakan function untuk mengambil  data ksus hrian covid global
        setLoadingChart(true) // merubah nilai dari state loaingChart menjadi true 
        fetch(API_COVID19_GLOBAL + "api/daily") // memanggil http klien "fecth" untuk memanggil data dari url  https://covid19.mathdro.id/api/daily
            .then(response => response.json()) // Mengubah hasil fecth menjadi JSON
            .then(data => {
                processDataDailyGlobal(data) // Memanggil function processDataDailyGlobal dan mengirim hasil fetch sebagai parameter nya
                setLoadingChart(false) // merubah nilai dari state loaingChart menjadi false 
            })
            .catch(error => {
                setLoadingChart(false)// merubah nilai dari state loaingChart menjadi false 
            })
    }
    const processDataDailyGlobal = (data) => { // Merupakan function untuk memproses data hasil fetch dat harisn covid global
        var label = data.map(function(item, index) {
            var tanggal = moment(item.reportDate) // Memanggil function moment dari librry  moment-with-locales dan mengirim reportDate sebagai parameter nya
            tanggal.locale('id') // Merubah locale moment menjadi bahasa indonesi, agar nama bulan dan hari menjadi bahasa indonesia
            var tanggal_text = tanggal.format('dddd, D MMMM YYYY') // Memasukan Format tanggal ,mejadi hari, tanggal bulan tahun
            return tanggal_text
        }) // Membuat array label kasus harian covid dari array data hasil fetch dengan item yang disesuiakn
        var dataChartDeath = data.map(function(item, index) {
            return item.deaths.total
        }) // Membuat array brau berisi jumlah kasus meninggal dari array data hasil fetch
        var dataChartConfirmed = data.map(function(item, index) {
            return item.confirmed.total
        }) // Membuat array brau berisi jumlah kasus terkonfirmsi dari array data hasil fetch
        var dataChartRecovered = data.map(function(item, index) {
            return item.recovered.total
        })  // Membuat array brau berisi jumlah kasus sembuh dari array data hasil fetch
        var dataSetChartConfirmed = [{
            data: dataChartConfirmed, // array berisi jumlah kasus terkonfirmasi
            label: "Jumlah Kasus Terkonfirmasi Harian", // Label chart
            borderColor: "#3e95cd", // warna garis pada chart
            backgroundColor: "#7bb6dd", // warna titik yang menandakan data per hari nya
            fill: false,
        }] // membuat dataset chart kasus terkonfirmsi
        var dataSetChartDeath = [{
            data: dataChartDeath, // array berisi jumlah kasus meninggal
            label: "Jumlah Kasus Meninggal Harian",// Label chart
            borderColor: "#FF9999", // warna garis pada chart
            backgroundColor: "#FF6663",// warna titik yang menandakan data per hari nya
            fill: false,
        }]// membuat dataset chart kasus meninggal
        var dataSetChartRecovered = [{
            data: dataChartRecovered, // array berisi jumlah kasus sembuh
            label: "Jumlah Kasus Sembuh Harian",// Label chart
            borderColor: "#64B065", // warna garis pada chart
            backgroundColor: "#73D673 ",// warna titik yang menandakan data per hari nya
            fill: false,
        }]// membuat dataset chart kasus sembuh
        setDataChartDailyConfirmed({
            label: label,
            data: dataSetChartConfirmed
        }) // merubah isi state dataChartDailyConfirmed menjadi array berisi array label dan dataset chart kasus terkonfirmasi
        setDataChartDailyDeath({
            label: label,
            data: dataSetChartDeath
        })// merubah isi state setDataChartDailyDeath menjadi array berisi array label dan dataset chart kasus meninggal
        setDataChartDailyRecovered({
            label: label,
            data: dataSetChartRecovered
        })// merubah isi state setDataChartDailyRecovered menjadi array berisi array label dan dataset chart kasus sembuh
    }
    
    const getDataDailyIndo = () => {// Merupakan function untuk mengambil  data ksus hrian covid global
        setLoadingChart(true) // merubah nilai dari state loaingChart menjadi true 
        fetch(API_COVID19_INDO + "api/indonesia/harian") // memanggil http klien "fecth" untuk memanggil data dari url  https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian
            .then(response => response.json()) // Mengubah hasil fecth menjadi JSON
            .then(data => {
                processDataDailyIndo(data) // Memanggil function processDataDailyIndo dan mengirim hasil fetch sebagai parameter nya
                setLoadingChart(false) // merubah nilai dari state loaingChart menjadi false 
            })
            .catch(error => {
                setLoadingChart(false)// merubah nilai dari state loaingChart menjadi false 
            })
    }
    
     const processDataDailyIndo = (data) => { // Merupakan function untuk memproses data hasil fetch dat harisn covid global
        var label = data.map(function(item, index) {
            var tanggal = moment(item.reportDate) // Memanggil function moment dari librry  moment-with-locales dan mengirim reportDate sebagai parameter nya
            tanggal.locale('id') // Merubah locale moment menjadi bahasa indonesi, agar nama bulan dan hari menjadi bahasa indonesia
            var tanggal_text = tanggal.format('dddd, D MMMM YYYY') // Memasukan Format tanggal ,mejadi hari, tanggal bulan tahun
            return tanggal_text
        }) // Membuat label kasus harian covid dari array data hasil fetch dengan item yang disesuiakn
        var dataChartDeath = data.map(function(item, index) {
            return item.meninggal
        }) // Membuat array brau berisi jumlah kasus meninggal dari array data hasil fetch
        var dataChartConfirmed = data.map(function(item, index) {
            return item.positif
        }) // Membuat array brau berisi jumlah kasus terkonfirmsi dari array data hasil fetch
        var dataChartRecovered = data.map(function(item, index) {
            return item.sembuh
        })  // Membuat array brau berisi jumlah kasus sembuh dari array data hasil fetch
        var dataSetChartConfirmed = [{
            data: dataChartConfirmed, // array berisi jumlah kasus terkonfirmasi
            label: "Jumlah Kasus Terkonfirmasi Harian", // Label chart
            borderColor: "#3e95cd", // warna garis pada chart
            backgroundColor: "#7bb6dd", // warna titik yang menandakan data per hari nya
            fill: false,
        }] // membuat dataset chart kasus terkonfirmsi
        var dataSetChartDeath = [{
            data: dataChartDeath, // array berisi jumlah kasus meninggal
            label: "Jumlah Kasus Meninggal Harian",// Label chart
            borderColor: "#FF9999", // warna garis pada chart
            backgroundColor: "#FF6663",// warna titik yang menandakan data per hari nya
            fill: false,
        }]// membuat dataset chart kasus meninggal
        var dataSetChartRecovered = [{
            data: dataChartRecovered, // array berisi jumlah kasus sembuh
            label: "Jumlah Kasus Sembuh Harian",// Label chart
            borderColor: "#64B065", // warna garis pada chart
            backgroundColor: "#73D673 ",// warna titik yang menandakan data per hari nya
            fill: false,
        }]// membuat dataset chart kasus sembuh
        setDataChartDailyConfirmed({
            label: label,
            data: dataSetChartConfirmed
        }) // merubah isi state dataChartDailyConfirmed menjadi array berisi array label dan dataset chart kasus terkonfirmasi
        setDataChartDailyDeath({
            label: label,
            data: dataSetChartDeath
        })// merubah isi state setDataChartDailyDeath menjadi array berisi array label dan dataset chart kasus meninggal
        setDataChartDailyRecovered({
            label: label,
            data: dataSetChartRecovered
        })// merubah isi state setDataChartDailyRecovered menjadi array berisi array label dan dataset chart kasus sembuh
    }
    
    const getDataListRegionIndo = () => { // Merupakan function untuk mengambil  data ksus hrian di indonesia per provinsi
        setLoadingRegion(true)   // merubah nilai dari state loaingRegion menjadi true 
        fetch(API_COVID19_INDO + "api/indonesia/provinsi")  // memanggil http klien "fecth" untuk memanggil data dari url  https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi
            .then(response => response.json()) // Mengubah hasil fecth menjadi JSON
            .then(data => {
                var list = data.map((item, index) => {
                    return {
                        title: item.provinsi,
                        count: item.kasus,
                        color: colorCaseCount(item.kasus) // memanggil function colorCaseCount untuk mendapatkan warna tulisan dengan jumlah kasus sebagai parameter nya
                    }
                })  // Membuat array baru  dari array data hasil fetch dengan isi nama provinsi, jumlah kasus, dan warna tulisan
                setDataListRegion(list)  // merubah nilai dari state dataListRegion menjadi array yang dibuat di atas 
                setLoadingRegion(false)  // merubah nilai dari state loaingRegion menjadi false 
            })
            .catch(error => {
                setLoadingRegion(false)   // merubah nilai dari state loaingRegion menjadi false 
            })
    }
    const getDataListRegionGlobal = () => { // Merupakan function untuk mengambil  data ksus hrian global per negara
        setLoadingRegion(true)  // merubah nilai dari state loaingRegion menjadi true 
        fetch(API_COVID19_GLOBAL + "api/confirmed")  // memanggil http klien "fecth" untuk memanggil data dari url "https://covid19.mathdro.id/api/confirmed
            .then(response => response.json()) // Mengubah hasil fecth menjadi JSON
            .then(data => {
                var list = data.map((item, index) => {
                    return {
                        title: item.countryRegion,
                        count: item.confirmed
                    }
                })  // Membuat array baru  dari array data hasil fetch dengan isi nama negara, jumlah kasus
                setDataListRegion(list) // merubah nilai dari state dataListRegion menjadi array yang dibuat di atas 
                setLoadingRegion(false) // merubah nilai dari state loaingRegion menjadi false 
            })
            .catch(error => {
                setLoadingRegion(false) // merubah nilai dari state loaingRegion menjadi false 
            })
    }
    const handleChangeSourceApi = (event) => {  // merubah functin yang di pnaggil ketika memilih  sroucetype pada input select
        setSourceApi(event.target.value) // merubah nilai dari state sourceApi menjadi sesuai dengan  option select yang dipilih
    }
    const setLetterCapital = (string) => { // merupakan function untuk mengubah hurf pertama pada setiap kata menjai upper case
        const str = string.toLowerCase()
        const arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        return arr.join(" ");
    }
    const colorCaseCount = (caseCount) => { // merupakan function utuk menetukan warna tulisan berdasarkan jumlah kasus
        if (caseCount > 100000) {
            return '#F70000' //merah
        } else if (caseCount >= 50000 && caseCount <= 100000) {
            return '#EA6A05' //jingga
        } else if (caseCount > 10000 && caseCount < 50000) {
            return '#F2F201' //kuning
        } else if (caseCount <= 10000) {
            return '#05F12C' //hijau
        }
    }

    const handleSearchKasusProvinsi = (event) => { // merupakan function yang dipanggil ketika user mengetik pada input search pada card kategori di isi
      if(event.key === 'Enter'){ // Ketika user menekan enter
        var text = event.target.value // mengambil isi search fiel
        setKeyword(text)  // merubah nilai dari state keyword menjadi sesuai dengan variabel di atas 
        
      }
    }

    const handleChangeSearchKasusProvinsi = (event) => {  // merupakan function yang dipanggil ketika user mengetik pada input search pada card kategori di isi
      if(!event.target.value){ // ketika isi search fiedld kosong
        setKeyword("") // merubah nilai dari state keyword menjadi string kosong
      }
    }

    const getDataRegion = () => {   // merupakan function yang mengembalikan array berisi list data region
      if(keyword){ // ketika state keyword tidak kosong
        let regex = new RegExp(keyword, 'i');  // membuat regex untuk mncari data berdasar state keyword
        let filtered = dataListRegion.filter(item => regex.test(item.title)); // membuat array baru dengan cara memfilter data dari state ataListRegion yang memiliki title yng hmpir sama dengan state keyword
        return filtered // mengembalikan varibale filtered sebagai nilai balikan dari function getDataRegion
      } else {
        return dataListRegion  // mengembalikan state dataListRegion sebagai nilai balikan dari function getDataRegion
      }
    }

    const getDate = ()=> { // berfungsti untuk mengembalikan data string bahasainoensai dari state lastUpdateDate
     var tanggal = moment(lastUpdateDate) // Memanggil function moment dari librry  moment-with-locales dan mengirim state lastUpdateDate sebagai parameter nya
     tanggal.locale('id') // Merubah locale moment menjadi bahasa indonesi, agar nama bulan dan hari menjadi bahasa indonesia    
      return tanggal.format('dddd, D MMMM YYYY') // Memasukan Format tanggal ,mejadi hari, tanggal bulan tahun
    }

    const MySwal = withReactContent(Swal)

    const handleClickShowPopUp = () => { // Berfungsi untk menampilkan pop up sweet alert 
        MySwal.fire(<p>Selamat Datang</p>)
    }

  return (
    <div>
      <button onClick={handleClickShowPopUp} type="button" style={{ position: "fixed", bottom: "10px", right: "10px" , zIndex: 2, height: "42px"}} className="shadow btn btn-success rounded-circle shadow position-fixed" >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-laughing rounded-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
          <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"></path>
        </svg>
      </button>
      <main className="container-fluid bg-light">
        <div className="row mt-4">
          <div className="col-12 col-md-8">
            <p> { getDate() } </p>
            
          </div>
          <div className="col-12 col-md-4">
            <select class="form-select " onChange={handleChangeSourceApi} value={sourceApi} aria-label=".form-select-lg example">
              <option value="GBL" selected >Global</option>
              <option value="INDO">Indonesia</option>
            </select>
          </div>
        </div>
        <div className="row mt-4">
          {loadingChart
          ? <div className="p-5">
            <Loading/>
          </div>
          : (
              dataSummary.map((item, i) => {
                return (
                  <div className={`col-12 col-md-${sourceApi === "GBL" ? '4' : '3'}`}>
                    <CardItem title={item.title} data={item.data} />
                  </div>
                )
              })
            )
          }
        </div>
        <div className="row mt-4">
          <div className="col-12 col-md-8">
            <div className="card">
              <div className="card-body">
                <p className="card-title">Data Kasus Terkonfirmasi Covid 19</p>
                {
                  !loadingChart
                  ?
                    <SimpleChart label={dataChartDailyConfirmed.label} data={dataChartDailyConfirmed.data} />
                  
                  : <div className="p-5">
                      <Loading/>
                    </div>
                }
              </div>
            </div>
            
          </div>
          <div className="col-12 col-md-4">
            <div className="card">
              <div className="card-body">

                <p className="card-title">{  sourceApi === "GBL" ? 'Jumlah Kasus Per Negara' : 'Jumlah Kasus Per Provinsi' }</p>

                {
                  !loadingChart ?
                  (
                    <div>
                      <input className="form-control my-2"  onKeyDown={handleSearchKasusProvinsi} onChange={handleChangeSearchKasusProvinsi} placeholder={`Cari ${sourceApi === "GBL" ? 'Negara' : 'Provinsi'}...`} />
                      <div style={{height: "200px"}} className="overflow-scroll p-3">
                        {
                          getDataRegion().map((item, i) => {
                            return (
                              <div className="d-flex justify-content-between">
                                <p> { setLetterCapital(item.title) } </p>
                                <p className="fw-bold" style={{ color: item.color }}> { item.count.toLocaleString() } </p>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                  : <div className="p-5">
                    <Loading/>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <p className="card-title">Data Kasus Sembuh Covid 19</p>
                {
                  !loadingChart ?
                    <SimpleChart label={dataChartDailyRecovered.label} data={dataChartDailyRecovered.data} />
                  
                  : <div className="p-5">
                      <Loading/>
                    </div>
                }
              </div>
            </div>
            
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <p className="card-title">Data Kasus Meninggal Covid 19</p>
                {
                  !loadingChart
                  ?
                    <SimpleChart label={dataChartDailyDeath.label} data={dataChartDailyDeath.data} />
                  
                  : <div className="p-5">
                      <Loading/>
                    </div>
                }
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
    );
}
