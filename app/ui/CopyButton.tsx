export default function CopyButton(){

    return<>
    <span id="default-message" className="bg-slate-400 rounded-md ml-5 inline-flex items-center mb-2 pl-1 pr-1 hover:pl-2">
      <svg className="w-3 h-3 me-1.5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 18 20">
         <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
       </svg>
      <span className="text-s font-thin">Copy</span>
    </span>
    </>
}