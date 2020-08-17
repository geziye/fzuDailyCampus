current_date=$(date  "+%Y_%m_%d")
log_name="${current_date}.log"
if [ ! -f "/usr/include/campus_daily/log/$log_name" ]; then
        touch /usr/include/campus_daily/log/$log_name
fi
current_time=$(date  "+%Y_%m_%d_%H_%M_%S")
echo $current_time >> /usr/include/campus_daily/log/$log_name
cd /usr/include/campus_daily/ && /usr/local/nodejs/bin/ts-node ./src/index.ts>> /usr/include/campus_daily/log/$log_name
echo -e >> /usr/include/campus_daily/log/$log_name