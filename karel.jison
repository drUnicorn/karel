/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+           return 'mezera'
"KROK"        return 'krok'
"VLEVO-VBOK"  return 'vlevo'
"KDYZ"        return 'kdyz'
"JE"          return 'je'
"NENI"        return 'neni'
"KONEC"       return 'konec'
"ZED"         return 'zed'
"SEVER"       return 'sever'
"JIH"         return 'jih'
"VYCHOD"      return 'vychod'
"ZAPAD"       return 'zapad'
<<EOF>>       return 'eof'

/lex

%start program
%%

program
  : prikazy
      { solve(); }
  ;

prikaz
  : krok
      { instrukce.push(krok); }
  | vlevo
      { instrukce.push(vlevoVbok); }
  | kdyz mezera je mezera podminka
      {{
        instrukce.push([
          "kdyz",
          function(){ return window[$5]; }
        ]);
      }}
  | kdyz mezera neni mezera podminka
      {{
        instrukce.push([
          "kdyz",
          function(){ return !window[$5]; }
        ]);
      }}
  | konec
      { instrukce.push(["konec"]); }
  ;

podminka
  : zed
      { $$ = "zed";    }
  | sever
      { $$ = "sever";  }
  | jih
      { $$ = "jih";    }
  | vychod
      { $$ = "vychod"; }
  | zapad
      { $$ = "zapad";  }
  ;

prikazy
  : mezera prikaz mezera prikazy
      { $$; }
  | prikaz mezera prikazy
      { $$; }
  | mezera prikaz eof
      { $$; }
  | prikaz eof
      { $$; }
  ;

%%
var instrukce = [];

function solve(){
  var i = -1;
  function step(){
    i++;
    if(i>=instrukce.length){
     instrukce = [];
     return;
    }
    console.log(instrukce[i]);
    if(typeof instrukce[i] === "function"){
      instrukce[i]();
      setTimeout(step, karel.time || 500);
    }else{
      var x = instrukce[i];
      switch(x[0]){
        case "kdyz":
          console.log( x[1]() );
          if( !x[1]() ){
            while(!(
              typeof instrukce[i] === "object" &&
              instrukce[i][0] === "konec"
            )){i++;}
          }
          break;
        case "konec":
          break;
      }
      step();
    }
  }
  step();
}
