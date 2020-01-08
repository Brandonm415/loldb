
/*This will dynamically add a navigation bar to every page once loaded*/

document.body.insertAdjacentHTML('afterbegin', `
		<ul id="navi">
			<!-- https://www.w3schools.com/css/css_navbar.asp -->
			<li><a href="/home">HOME</a></li>
			<li><a href="/add">ADD</a></li>
			<li><a href="/delete">DELETE</a></li>
			<li><a href="/update">UPDATE</a></li>
		</ul>
    `);

/*Below will add the active class to the navi bar and verifies the correct link */
var findHref = document.getElementsByTagName('a');

for (i = 0; i < findHref.length; i++) {
    if (findHref[i].href == location.href) {
        findHref[i].classList.add("active");
    }
}
