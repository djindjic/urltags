# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Link.create({
    scheme: 'http',
    host: 'www.aba-liga.com',
    path: '/news.php',
    params_serialized: 'id=37135',
    tags_serialized: 'aaa,bbb,ccc'
})

Link.create({
    scheme: 'http',
    host: 'www.aba-liga.com',
    path: '/news.php',
    params_serialized: 'id=37125',
    tags_serialized: 'oooo,eeee,rrrrr'
})

Link.create({
    scheme: 'http',
    host: 'www.aba-liga.com',
    path: '/news.php',
    params_serialized: 'id=37136',
    tags_serialized: 'ccc,fffff,gg'
})
