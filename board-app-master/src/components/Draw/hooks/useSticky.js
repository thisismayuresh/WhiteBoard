import { useState } from "react";
export const useSticky =()=>{
    const [notes, setNotes] = useState([]);
  const [stickyShow, setStickyShow] = useState(true);
  return {notes,setNotes,stickyShow,setStickyShow}
}