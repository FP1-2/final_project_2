export default function deleteAllCookies() {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const cookieParts = cookie.split('=');
      const cookieName = cookieParts[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }