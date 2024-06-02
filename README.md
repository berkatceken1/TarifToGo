Projeyi başlatmak için konsolda ilk olarak TarifToGo-backend kısmına gelip "npx nodemon app" yazılarak veritabanı bağlantısı yapılması gerekir

Ardından TarifToGo-frontend kısmına gelip "npx expo start" yazılmalı böylece expo üzerinden karekod okutularak proje telefondan çalıştıralıabilir. 2. seçenek olarak android studio' da açılan sanal cihaz üzerinden  "npx expo start" yapıldıktan sonra "a" diyerek android sanal cihaz üzerinden proje çalıştırılabilir.

error: Use process(css).then(cb) to work with async plugins
bu hata alındığında konsolda projenin frontend kısmına gelip npm install tailwindcss@3.3.2 yüklenmesi gerekir.

HomeScreen, LoginScreen, ProfileScreen, SignupScreen, DrawerContent ve UpdateProfile sayfalarına axios.post('http://IPv4 Address') ilgili kısma yazılmalıdır.
