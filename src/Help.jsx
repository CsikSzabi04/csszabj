import React from 'react';

const codeSnippets = [
    // Add this inside the codeSnippets array
{
    title: "Betölt and Rand",
    tags: ["Konzol"],
    code: `betolt("utazok.csv");

System.out.printf("0)\\t%d utazó adat beolvasva\\n", adat.size());
ArrayList<String> asd = new ArrayList<>();
for(Adat x : adat) if(!asd.contains(x.sdf)) asd.add(x.sdf);
System.out.printf("1)\\tÖsszesen %d városba utaztak\\n", asd.size());

int rand = (int)(Math.random() * adat.size());
Adat ran = adat.get(rand);`
},

    {
        title: "Java Class",
        tags: ["Konzol", "Graf"],
        code: `private class Adat {

    public String adat1;
    public String adat2;
    public String adat3;
    public String adat4;

    public Adat(String sor) {
        String[] s = sor.split(";");
        adat1 = s[0];
        adat2 = s[1];
        adat3 = Integer.parseInt(s[2]);
        adat4 = Integer.parseInt(s[3]);
    }
}
    

ArrayList<Adat> adat = new ArrayList<Adat>();`
    },
    {
        title: "File Reading Method",
        tags: ["Konzol"],
        code: `private void betolt(String fajlnev) {
    Scanner be = null;
    try {
        be = new Scanner(new File(fajlnev), "UTF-8");
        while(be.hasNextLine()) adat.add(new Adat(be.nextLine()));
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } finally {
        if(be != null) be.close();
    }
}`
    },
    {
        title: "Print to xyz.txt",
        tags: ["Konzol"],
        code: `PrintWriter ki = null;
try {
    ki = new PrintWriter("xyz.txt", "utf-8");
    for(Adat x : adat) 
        if(?) 
            ki.printf("%s (%s %s)\\r\\n", x.xy, x.cx, x.vc);
} catch (Exception e) {
    e.printStackTrace();
} finally {
    if (ki != null) ki.close();
}`
    },
    {
        title: "TreeMap Binning",
        tags: ["Konzol"],
        code: `TreeMap<Integer, Integer> asd = new TreeMap<>();
for(T x : t) {
    int s = x.xya / 50; // ("Amennyivel kell hogy nőjjön")
    if (!asd.containsKey(s)) {
        asd.put(s, 1);
    } else {
        asd.put(s, asd.get(s) + 1);
    }
}
for(Integer x : asd.keySet()) {
    System.out.printf("\\t %03d-%03d: %d darab \\n", x*50, x*50+49, asd.get(x));
}`
    },
    {
        title: "Double Letter Finder",
        tags: ["Konzol"],
        code: `System.out.println("4) Kettős betű van az yxc-ben: ");
for(Adat x : adat){
    String[] words = x.yxc.split(" ");
    for (String word : words) {
        for (int i = 0; i < word.length() - 1; i++) {
            if (word.charAt(i) == word.charAt(i + 1)) {
                System.out.printf("\\t * %s \\n", x.yxc);
            }
        }
    }
}`
    },
    {
    title: "FXML File Open + ListView Fill",
    tags: ["Graf"],
    code: `FileChooser fc = new FileChooser();

@FXML protected void onMegnyitasClick() {
    File fbe = fc.showOpenDialog(lvBal.getScene().getWindow());
    if(fbe != null) betolt(fbe);
}

private void betolt(File fajl) {
    lvBal.getItems().clear();
    lvJobb.getItems().clear();
    Scanner be = null;
    try {
        be = new Scanner(fajl, "UTF-8");
        be.nextLine();
        while(be.hasNextLine()) adat.add(new Adat(be.nextLine()));
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } finally {
        if(be != null) be.close();
    }
    for(Adat x : adat) {
        lvBal.getItems().add(x.asd);
    }
}`
},
{
    title: "FXML Init FileChooser",
    tags: ["Graf"],
    code: `@FXML protected void initialize() {
    fc.getExtensionFilters().add(new FileChooser.ExtensionFilter("f", "*.csv"));
    fc.setInitialDirectory(new File("./"));
}`
},
{
    title: "FXML Buttons: Névjegy + Kilépés",
    tags: ["Graf"],
    code: `@FXML protected void onNevjegyClick() {
    Alert info = new Alert(Alert.AlertType.INFORMATION);
    info.setContentText("ASD v1.0.0\\n(C) Kandó");
    info.setHeaderText(null);
    info.setTitle("Névjegy");
    info.showAndWait();
}

@FXML protected void onKilepesClick() {
    System.exit(0);
}`
},
{
    title: "ListView Selection Index | getIcons",
    tags: ["Graf"],
    code: `int selectedIndex = lvBal.getSelectionModel().getSelectedIndex();
    
stage.getIcons().add(new Image(getClass().getResourceAsStream("asd.png")));`
},
{
  title: "Printf Format Specifiers",
  tags: ["Konzol"],
  code: `/*
%s - String típusú változó behelyettesítése
%d - Integer behelyettesztése
%f - float vagy double behelyettesztése
%.1f - float vagy double pontosságának formázása
        pl: 1.34 -> %.1f = 1.3
            1.34 -> %.0f = 1
*/
System.out.printf("%.1f", 1.34);`
},

{
  title: "TreeSet Usage & Notes",
  tags: ["Konzol"],
  code: `/*
TreeSet<String> set = new TreeSet<>();
Bármilyen típusú változó lehet
Akkor kell használni, mikor szeretnénk megszámolni adatokat azoknak az ismétlése nélkül
pl: városnevek megszámolása egy feladatban ahol ismétlődnek a városok

for (Adat a : Lista) {
    set.add(a.valami);
}
System.out.println(set);
// automatikusan nem rakja bele az adatot ha az már benne van

set.remove(valami); // törlés a setből
*/`
}     

];

const Section = ({ label }) => {
    const filteredSnippets = codeSnippets.filter(snippet =>
        snippet.tags.includes(label)
    );

    return (
        <div className="w-1/2 min-h-screen p-6 overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 gradient-text">{label} Section</h1>
            {filteredSnippets.map((snippet, index) => (
                <div
                    key={`${label}-${index}`}
                    className="bg-black bg-opacity-70 p-6 rounded-2xl shadow-lg mb-8 max-w-full fade-in visible"
                >
                    <h2 className="text-xl font-bold gradient-text mb-4">
                        {snippet.title} -- ({label})
                    </h2>
                    <pre className="overflow-x-auto text-sm leading-relaxed">
                        <code className="whitespace-pre-wrap">{snippet.code}</code>
                    </pre>
                </div>
            ))}
        </div>
    );
};

const Help = () => {
    return (
        <div className="scroll-container text-gray-100 font-sans antialiased">
            <div className="flex w-screen min-h-screen">
                <Section label="Konzol" />
                <Section label="Graf" />
            </div>
        </div>
    );
};

export default Help;
