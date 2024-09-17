export const fetchMovies = async () => {
    const response = await fetch('https://api.indrajala.in/api/admin/Corrosil-Desktop');
    const data = await response.json();
    return data;
  };


  export const toptrending = async () => {
    const response = await fetch('https://api.indrajala.in/api/admin/toptrending');
    const data = await response.json();
    return data;
  };



  export const topfive = async () => {
    const response = await fetch('https://api.indrajala.in/api/admin/topfive');
    const data = await response.json();
    return data;
  };


  export const upcomming = async () => {
    const response = await fetch('https://api.indrajala.in/api/admin/upcomming');
    const data = await response.json();
    return data;
  };




export const HoverMovies = async () => {
    const response = await fetch('https://api.indrajala.in/api/admin/CorrosilListMovies');
    const data = await response.json();
    return data;
  };