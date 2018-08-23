my $test = "hello world!";
my $refT = \$test;
my $bar = stdlib::string->new($$refT);
{
    my $foo = stdlib::string->new("wahou!");
};
