
function PausePhasePlayer(){
    return (
        <div className="pt-12 md-max:flex md-max:flex-col-reverse">
        <div className="bg-gray-200 my-2 p-2 col-span-7 h-auto">
          <div className="flex justify-between">
            <div className=" p-3 rounded-lg">

            </div>
            <div className=" p-3 rounded-lg">
            </div>
            <div 
            className=" p-3 rounded-lg">

            </div>
          </div>
          <div className="flex flex-col gap-y-4 items-center p-5">
            <div className="w-full px-4 py-2 border border-gray-300 bg-white rounded  text-center">
              Pause Phase
            </div>
            <div className="box-border w-64 border-4">
              <img
                src={
                  "https://asset.kompas.com/crops/sn--2PkUfeAmtszsB-wnqXmwBkM=/0x0:5184x3456/750x500/data/photo/2020/12/11/5fd303549b2c9.jpg"
                }
                className="h-32 rounded-lg w-full object-cover"
              />
            </div>
    
            
          </div>
        </div>
      </div>
    )
}

export default PausePhasePlayer