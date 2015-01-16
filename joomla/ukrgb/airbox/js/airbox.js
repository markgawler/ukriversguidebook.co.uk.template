/*
	Air-Box v0.9.5 - Let your breathe your images! 
	(c) 2008 Riccardo Budini  <http://www.provisum-illumina.com>
	MIT-style license.
*/

/*
	Air-Box resizer
*/

jQuery(document).ready(function(){
	airrez();
});

function start() { 
	  airrez(); 
	} 
	 
	window.onload = start; 

function airrez()
{
   if (document.getElementsByName)
   {
      for (i=0; i<document.getElementsByTagName('img').length; i++) 
      {
         pic = document.getElementsByTagName('img')[i];
		 
	     if (pic.className == "postimage") 
		 {
         if (pic.width > 660)
         	{
            pic.setAttribute('width','660')

            
            if (document.all) pic.style.cursor = 'hand';
            if (!document.all) pic.style.cursor = 'pointer';
            pic.title = 'Click Here To See Image Full Size ';
         	}
       }
	 }
   }
}