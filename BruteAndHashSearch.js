let s = "Eh bien, mon prince. Gênes et Lucques ne sont plus que des apanages, des поместья, de la famille Buonaparte. Non, je vous préviens que si vous ne me dites pas que nous avons la guerre, si vous vous permettez encore de pallier toutes les infamies, toutes les atrocités de cet Antichrist (ma parole, j'y crois) — je ne vous connais plus, vous n'êtes plus mon ami, vous n'êtes plus мой верный раб, comme vous dites 1. Ну, здравствуйте, здравствуйте. Je vois que je vous fais peur 2, садитесь и рассказывайте.\n" +
    "Так говорила в июле 1805 года известная Анна Павловна Шерер, фрейлина и приближенная императрицы Марии Феодоровны, встречая важного и чиновного князя Василия, первого приехавшего на ее вечер. Анна Павловна кашляла несколько дней, у нее был грипп, как она говорила (грипп был тогда новое слово, употреблявшееся только редкими). В записочках, разосланных утром с красным лакеем, было написано без различия во всех:\n" +
    "«Si vous n'avez rien de mieux à faire, Monsieur le comte (или mon prince), et si la perspective de passer la soirée chez une pauvre malade ne vous effraye pas trop, je serai charmée de vous voir chez moi entre 7 et 10 heures. Annette Scherer» 3.\n" +
    "— Dieu, quelle virulente sortie! 4 — отвечал, нисколько не смутясь такою встречей, вошедший князь, в придворном, шитом мундире, в чулках, башмаках и звездах, с светлым выражением плоского лица.\n" +
    "Он говорил на том изысканном французском языке, на котором не только говорили, но и думали наши деды, и с теми, тихими, покровительственными интонациями, которые свойственны состаревшемуся в свете и при дворе значительному человеку. Он подошел к Анне Павловне, поцеловал ее руку, подставив ей свою надушенную и сияющую лысину, и покойно уселся на диване."
let t = "говорил"

console.log(BruteForce(s, t))
console.log(QuadraticHash(s, t))
console.log(RabinCarpHash(s, t))


function BruteForce(s, t)
{
    let found = false
    for (let i = 0; i <= s.length - t.length && !found;i++)
    {
        for (j = 0;j < t.length;j++)
        {
            if (s[i + j] != t[j])
            {
                break;
            }
            if (j == t.length - 1)
            {
                found = true;
                return i;
            }
        }
    }

}



function QuadraticHash(s, t)
{
    let h = 0;
    let tHash = 0
    for (let i = 0; i < t.length; i++)
    {
        h += Math.pow(s.charCodeAt(i), 2)
        tHash += Math.pow(t.charCodeAt(i), 2)
    }
    if (h == tHash)
    {
        return 0
    }
    for (let i = 1; i <= s.length - t.length; i++)
    {


        h = h - Math.pow(s.charCodeAt(i - 1), 2) + Math.pow(s.charCodeAt(i + t.length - 1), 2)
        if (h == tHash)
        {
            return i
            break
        }


    }

}

function RabinCarpHash(s, t)
{

    let h = 0;
    let tHash = 0
    for (let i = 1; i <= t.length; i++)
    {
        h += s.charCodeAt(i - 1) * Math.pow(2, t.length - i)
        tHash += t.charCodeAt(i - 1) * Math.pow(2, t.length - i)
    }
    if (h == tHash)
    {
        return 0
    }

    for (let i = 2; i <= s.length - t.length + 1; i++)
    {
        h =  (h - s.charCodeAt(i - 2) * Math.pow(2, t.length - 1 )) * 2 + s.charCodeAt(t.length + i - 2)

        if (h == tHash)
        {
            return i - 1
            break
        }


    }

}
