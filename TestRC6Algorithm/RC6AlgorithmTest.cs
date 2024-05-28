using RC6AlgorithmAngularNetCore.Server.Cipher;

namespace TestRC6Algorithm
{
    public class RC6AlgorithmTest : IDisposable
    {
        public RC6AlgorithmTest()
        {
            
        }
        public void Dispose()
        {
            
        }

        [Fact]
        public void GenerateKey_Test1()
        {
            var key = "secretKeyForThesis";
            var generatedKey = RC6.GenerateKey(128, System.Text.Encoding.UTF8.GetBytes(key));

            uint[] expectedGeneratedKey = new uint[]
            {
                904324079, 2627396982, 122039003, 2811530256, 765274824, 280331553, 1488404107, 1499918644, 1026241309, 2803168660, 2854384151,
                2096143611, 2771379057, 1276971515, 3601494008, 999849777, 3917264247, 1365784673, 346379875, 1844092588, 3020946153, 260486914,
                4218446440, 3661416767, 2290022687, 447927241, 1330931621, 271958288, 944886398, 557149867, 1751602550, 3970669057, 20528249,
                797219501, 1697736656, 2989803302, 2042216036, 1890109144, 4136823918, 1014861994, 844007561, 3420866435, 3328958384, 3927260315
            };

            Assert.True(generatedKey.SequenceEqual(expectedGeneratedKey));
        }

        [Fact]
        public void Encoding_Test1()
        {
            var key = "secretKeyForThesis";

            var generatedKey = RC6.GenerateKey(128, System.Text.Encoding.UTF8.GetBytes(key));

            var ciphertext = RC6.EncodeRc6(generatedKey, "Hello World");
            var expectedCipherText = "zitDFaO5GqboqAoKKz3/Rw==";

            Assert.Equal(expectedCipherText, Convert.ToBase64String(ciphertext));
        }

        [Fact]
        public void Decoding_Test1()
        {
            var key = "secretKeyForThesis";

            var generatedKey = RC6.GenerateKey(128, System.Text.Encoding.UTF8.GetBytes(key));

            var ciphertext = RC6.EncodeRc6(generatedKey, "Hello World");
            var decodedtext = RC6.DecodeRc6(generatedKey, ciphertext);
            var expectedDecodedText = "Hello World";

            Assert.Equal(expectedDecodedText, System.Text.Encoding.UTF8.GetString(decodedtext).TrimEnd('\0'));
        }

        [Fact]
        public void Encrypting_Test1()
        {
            var ciphertext = RC6.EncryptForDB("Hello World");
            var expectedCipherText = "zitDFaO5GqboqAoKKz3/Rw==";

            Assert.Equal(expectedCipherText, ciphertext);
        }

        [Fact]
        public void Decrypting_Test1()
        {
            var cipherText = "zitDFaO5GqboqAoKKz3/Rw==";
            var decodedtext = RC6.DecryptFromDB(cipherText);
            var expectedDecodedText = "Hello World";

            Assert.Equal(expectedDecodedText, decodedtext);
        }

        [Fact]
        public void EncryptingAndDecrypting_with128Key_Test1()
        {
            var originalMessage = "Hello World";
            var keySize = 128;
            var secretKey = "secretKeyForThesis";
            var decodedtext = RC6.DecryptFromDB(RC6.EncryptForDB(originalMessage, keySize, secretKey), keySize, secretKey);

            Assert.Equal(decodedtext, originalMessage);
        }

        [Fact]
        public void EncryptingAndDecrypting_with256Key_Test1()
        {

            var originalMessage = "Hello World";
            var keySize = 256;
            var secretKey = "secretKeyForThesissecretKeyForTh";
            var decodedtext = RC6.DecryptFromDB(RC6.EncryptForDB(originalMessage, keySize, secretKey), keySize, secretKey);

            Assert.Equal(decodedtext, originalMessage);
        }
    }
}