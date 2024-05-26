using System.Text;
using System.Security.Cryptography;
using System.Text;

namespace RC6AlgorithmAngularNetCore.Server.Cipher
{
    public class RC6
    {
        private const int R = 20; // a körök száma
        private const int W = 32; // gépi szó hossza bitekben
        private const uint P32 = 0xB7E15163; // az aranymetszés exponenciális állandói
        private const uint Q32 = 0x9E3779B9;
        /*Kulcsgenerálás*/
        //Konstruktor kulcsgenerálással
        public RC6(int keyLong)
        {
            GenerateKey(keyLong, null);
        }
        //Konstruktor tesztek futtatásához előre meghatározott kulccsal
        public RC6(int keyLong, byte[] key)
        {
            GenerateKey(keyLong, key);
        }
        // Jobbra tolás veszteség nélkül
        private static uint RightShift(uint value, int shift)
        {
            return (value >> shift) | (value << (W - shift));
        }
        //Balra tolás veszteség nélkül
        private static uint LeftShift(uint value, int shift)
        {
            return (value << shift) | (value >> (W - shift));
        }
        //Főkulcs és körkulcsok generálása
        public static uint[] GenerateKey(int Long, byte[] keyCheck)
        {
            uint[] RoundKey = new uint[2 * R + 4];
            byte[] MainKey;
            //Ha a főkulcs nincs előre meghatározva, használjunk véletlen kulcsgenerátort
            if (keyCheck == null)
            {
                AesCryptoServiceProvider aesCrypto = new AesCryptoServiceProvider //nem túl jó ötlet magunknak generálni a kulcsokat, kiváló implementáció a .Net AES könyvtára, de már nem a legújabb
                {
                    //A konstruktorban meghatározott kulcsméret beállítása
                    KeySize = Long
                };
                aesCrypto.GenerateKey();
                MainKey = aesCrypto.Key;
            }
            else MainKey = keyCheck;

            int c = 0;
            int i, j;
            //A kulcs méretétől függően kiválasztjuk, hány blokkra osztjuk a főkulcsot
            switch (Long)
            {
                case 128:// a kulcs hossza
                    c = 4; // szavak száma a kulcsban
                    break;
                case 192:// a kulcs hossza
                    c = 6; // szavak száma a kulcsban
                    break;
                case 256: // a kulcs hossza
                    c = 8; // szavak száma a kulcsban
                    break;
            }
            uint[] L = new uint[c];
            for (i = 0; i < c; i++)
            {
                L[i] = BitConverter.ToUInt32(MainKey, i * 4); // a kulcs szavakra bontása
            }
            //A körkulcsok generálása a dokumentációnak megfelelően
            RoundKey[0] = P32;
            for (i = 1; i < 2 * R + 4; i++)
                RoundKey[i] = RoundKey[i - 1] + Q32; // állandó hozzáadása a körkulcshoz
            uint A, B; // regiszterek
            A = B = 0;
            i = j = 0;
            int V = 3 * Math.Max(c, 2 * R + 4);  // a körök vagy a kulcsszavak számának maximuma
            for (int s = 1; s <= V; s++)
            {
                A = RoundKey[i] = LeftShift((RoundKey[i] + A + B), 3); // balra tolás 3-mal
                B = L[j] = LeftShift((L[j] + A + B), (int)(A + B)); // balra tolás a+b értékkel
                i = (i + 1) % (2 * R + 4);
                j = (j + 1) % c;
            }
            return RoundKey;
        }
        private static byte[] ToArrayBytes(uint[] uints, int Long)
        {
            byte[] arrayBytes = new byte[Long * 4];
            for (int i = 0; i < Long; i++)
            {
                byte[] temp = BitConverter.GetBytes(uints[i]);
                temp.CopyTo(arrayBytes, i * 4);
            }
            return arrayBytes;
        }
        public static byte[] EncodeRc6(uint[] expandedKeyTable, string plaintext)
        {
            uint A, B, C, D;
            //A kapott szöveg bájttömbbé alakítása
            byte[] byteText = Encoding.UTF8.GetBytes(plaintext);
            int i = byteText.Length;
            while (i % 16 != 0)
                i++;
            //Új tömb létrehozása, amely mérete 16-tal osztható, mivel az algoritmus négy 4 bájtos blokkal dolgozik.
            byte[] text = new byte[i];
            //A plaintext beírása
            byteText.CopyTo(text, 0);
            byte[] cipherText = new byte[i];
            //Ciklus minden 16 bájtos blokkra
            for (i = 0; i < text.Length; i = i + 16)
            {
                //A kapott 16 bájtos blokkot 4 gépi szóra bontjuk (32 bitenként)
                A = BitConverter.ToUInt32(text, i);
                B = BitConverter.ToUInt32(text, i + 4);
                C = BitConverter.ToUInt32(text, i + 8);
                D = BitConverter.ToUInt32(text, i + 12);
                //Az algoritmus a dokumentációnak megfelelően
                B = B + expandedKeyTable[0];
                D = D + expandedKeyTable[1];
                for (int j = 1; j <= R; j++)
                {
                    uint t = LeftShift((B * (2 * B + 1)), (int)(Math.Log(W, 2)));
                    uint u = LeftShift((D * (2 * D + 1)), (int)(Math.Log(W, 2)));
                    A = (LeftShift((A ^ t), (int)u)) + expandedKeyTable[j * 2];
                    C = (LeftShift((C ^ u), (int)t)) + expandedKeyTable[j * 2 + 1];
                    uint temp = A;
                    A = B;
                    B = C;
                    C = D;
                    D = temp;
                }
                A = A + expandedKeyTable[2 * R + 2];
                C = C + expandedKeyTable[2 * R + 3];
                //Gépi szavak visszaalakítása bájttömbbé
                uint[] tempWords = new uint[4] { A, B, C, D };
                byte[] block = ToArrayBytes(tempWords, 4);
                //A 16 bájt átalakított tömbjének beírása a titkosított szövegtömbbe
                block.CopyTo(cipherText, i);
            }
            return cipherText;
        }

        public static byte[] DecodeRc6(uint[] expandedKeyTable, byte[] cipherText)
        {
            uint A, B, C, D;
            int i;
            byte[] plainText = new byte[cipherText.Length];
            //A titkosított szöveg felosztása 16 bájtos blokkokra
            for (i = 0; i < cipherText.Length; i = i + 16)
            {
                //A blokk felosztása 4 gépi szóra, 32 bitenként
                A = BitConverter.ToUInt32(cipherText, i);
                B = BitConverter.ToUInt32(cipherText, i + 4);
                C = BitConverter.ToUInt32(cipherText, i + 8);
                D = BitConverter.ToUInt32(cipherText, i + 12);
                //A dekódolás folyamata a dokumentációnak megfelelően
                C = C - expandedKeyTable[2 * R + 3];
                A = A - expandedKeyTable[2 * R + 2];
                for (int j = R; j >= 1; j--)
                {
                    uint temp = D;
                    D = C;
                    C = B;
                    B = A;
                    A = temp;
                    uint u = LeftShift((D * (2 * D + 1)), (int)Math.Log(W, 2));
                    uint t = LeftShift((B * (2 * B + 1)), (int)Math.Log(W, 2));
                    C = RightShift((C - expandedKeyTable[2 * j + 1]), (int)t) ^ u;
                    A = RightShift((A - expandedKeyTable[2 * j]), (int)u) ^ t;
                }
                D = D - expandedKeyTable[1];
                B = B - expandedKeyTable[0];
                //Gépi szavak visszaalakítása bájttömbbé
                uint[] tempWords = new uint[4] { A, B, C, D };
                byte[] block = ToArrayBytes(tempWords, 4);
                //A dekódolt bájtok beírása a dekódolt szövegtömbbe
                block.CopyTo(plainText, i);
            }
            return plainText;
        }

        public static string EncryptForDB(string plaintext, int keySize = 128, string key = "secretKeyForThesis")
        {
            return Convert.ToBase64String(RC6.EncodeRc6(RC6.GenerateKey(keySize, Encoding.UTF8.GetBytes(key)), plaintext));
        }

        public static string DecryptFromDB(string ciphertext, int keySize = 128, string key = "secretKeyForThesis")
        {
            return Encoding.UTF8.GetString(RC6.DecodeRc6(RC6.GenerateKey(keySize, Encoding.UTF8.GetBytes(key)), Convert.FromBase64String(ciphertext))).TrimEnd('\0');
        }
    }
}
