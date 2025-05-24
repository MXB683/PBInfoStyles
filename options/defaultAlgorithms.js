"use strict";
const cppAlgorithms = [
  new AlgorithmNode(`%vmax (vector<int>)%
int vmax(vector<int> v) {
	int mx = v[0];
	for (int i = 1; i < v.size(); i++)
		if (v[i] > mx)
			mx = v[i];
	return mx;
}`),
  new AlgorithmNode(`%vmax (int[])%
int vmax(int v[], int n) {
	int mx = v[0];
	for (int i = 1; i < n; i++)
		if (v[i] > mx)
			mx = v[i];
	return mx;
}`),
  new AlgorithmNode(`%vmin (vector<int>)%
int vmin(vector<int> v) {
	int mn = v[0];
	for (int i = 1; i < v.size(); i++)
		if (v[i] < mn)
			mn = v[i];
	return mn;
}`),
  new AlgorithmNode(`%vmin (int[])%
int vmin(int v[], int n) {
	int mn = v[0];
	for (int i = 1; i < n; i++)
		if (v[i] < mn)
			mn = v[i];
	return mn;
}`),
  new AlgorithmNode(`%prime%
bool prime(int x) {
	if (x < 2)
		return false;
	for (int i = 2; i * i <= x; i++)
		if (x % i == 0)
			return false;
	return true;
}`),
  new AlgorithmNode(`%exp%
long long exp(int a, int b) {
	if(b == 0)
		return 1;
	if(b % 2 == 1)
		return a * exp(a , b - 1);
	long long p = exp(a , b / 2);
	return p * p;
}`),
  new AlgorithmNode(`%gcd (cmmdc)%
int gcd(int a, int b) {
	if (b == 0)
		return a;
	return gcd(b, a % b);
}`),
  new AlgorithmNode(`%lcm (cmmmc)%
int gcd(int a, int b) {
	if (b == 0)
		return a;
	return gcd(b, a % b);
}
inline int lcm(int a, int b) {
	return a / gcd(a, b) * b;
}`),
  new AlgorithmNode(`%prime (Sieve (Ciur))%
#define SIEVE_SIZE 1000000
bool sieve[SIEVE_SIZE];
void startSieve() {
	sieve[0] = sieve[1] = true;
	for(int i = 2; i <= SIEVE_SIZE / 2; i++)
		if(sieve[i] == 0)
			for(int j = i*2; j <= SIEVE_SIZE; j += i)
				sieve[j] = true;
}
inline bool prime(int x) { return !sieve[x]; }`),
  new AlgorithmNode(`%sumcif%
int sumcif(int x) {
	int s = 0;
	while (x) {
		s += x % 10;
		x /= 10;
	}
	return s;
}`),
  new AlgorithmNode(`%length%
int length(int x) {
	int l = 0;
	while (x) {
		l++;
		x /= 10;
	}
	return l;
}`),
  new AlgorithmNode(`%oglindit%
int ogl(int x) {
	if(x == 0) return 0;
	int o = 0;
	while (x) {
		o = o * 10 + x % 10;
		x /= 10;
	}
	return o;
}`),
  new AlgorithmNode(`%palindrom%
bool palindrom(int x) {
	if(x == 0) return true;
	int xc = x;
	int o = 0;
	while (x) {
		o = o * 10 + x % 10;
		x /= 10;
	}
	return o == xc;
}`),
  new AlgorithmNode(`%base10toX%
long long base10toX(long long n, int base) {
    if(base == 10) return n;
    int nr = 0, p = 1;
    while(n) {
        nr += (n % base) * p;
        p *= 10;
        n /= base;
    }
    return nr;
}`),
  new AlgorithmNode(`%baseXto10%
long long baseXto10(long long n, int base) {
    if(base == 10) return n;
    int nr = 0, p = 1;
    while(n) {
        nr += (n % 10) * p;
        p *= base;
        n /= 10;
    }
    return nr;
}`),
  new AlgorithmNode(`%baseXtoY%
long long base10toX(long long n, int base) {
    if(base == 10) return n;
    int nr = 0, p = 1;
    while(n) {
        nr += (n % base) * p;
        p *= 10;
        n /= base;
    }
    return nr;
}

long long baseXto10(long long n, int base) {
    if(base == 10) return n;
    int nr = 0, p = 1;
    while(n) {
        nr += (n % 10) * p;
        p *= base;
        n /= 10;
    }
    return nr;
}

long long baseXtoY(long long n, int baseX, int baseY) {
    if(baseX == baseY) return n;
    if(baseX == 10) return base10toX(n, baseY);
    if(baseY == 10) return baseXto10(n, baseX);
    return base10toX(baseXto10(n, baseX), baseY);
}`),
];
